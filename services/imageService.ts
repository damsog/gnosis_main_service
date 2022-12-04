import prisma from '../configurations/dbinit';
import { Image } from '@prisma/client';
import { ImageBaseDM, ImageDM } from '../dataModels/ImageDataModel';
import SftpService from './sftpService';
import logger from '../lib/logger';
import path, { resolve } from 'path';
import fs from 'fs';
import { EncodingService } from './encodingService';

export class ImageService {
    static async getAll(): Promise<Image[]> {
        const images = await prisma.image.findMany();
        return images;
    }

    static async getById(id: string): Promise<Image | null> {
        const image =  await prisma.image.findFirst({
            where: {
                id: id
            }
        });

        return image;
    }

    static async getByProfileId(id: string): Promise<Image[]> {
        const images = await prisma.image.findMany({
            where: {
                profileId: id
            }
        });

        return images;
    }

    static async getByGroupId(id: string): Promise<Image[]> {
        const images = await prisma.image.findMany({
            where: {
                profile: {
                    ProfileGroup: {
                        some: {
                            groupId: id
                        }
                    }
                }
            }
        });

        return images;
    }

    static async getByUserId(id: string): Promise<Image[]> {
        const images = await prisma.image.findMany({
            where: {
                profile: {
                    userId: id
                }
            }
        });

        return images;
    }

    static async create(image: ImageBaseDM, sftpClient: any): Promise<Image> {
        const publicFolder = path.join(__dirname, "../tmp/");

        const imageCreated = await prisma.image.create({
            data: {
                ...image
            }
        });
        
        const sftpService = new SftpService(sftpClient);

        await sftpService.mkdirIfNotExist(`/files/${imageCreated.profileId}/`);
        logger.debug(`mkdirIfNotExist: /files/${imageCreated.profileId}/`);
        
        await sftpService.upload(`${publicFolder}${imageCreated.name}`, `/files/${imageCreated.path}`);
        logger.debug(`upload: ${publicFolder}${imageCreated.name} to /files/${imageCreated.path}`);

        // if Success deletes the temp file
        await fs.unlinkSync(`${publicFolder}${imageCreated.name}`);   
        return imageCreated;
    }

    static async encodeImages(imageIds: string[] | undefined, profileId: string, sftpClient: any): Promise<any> {
        // Obtaining the profile. we need its name
        const profile = await prisma.profile.findFirst({
            where: {
                id: profileId
            }
        });
        if(!profile){
            logger.error(`Profile with id ${profileId} not found`);
            throw new Error("Profile not found");
        }
        logger.debug(`profile: ${profile?.name}`);

        // If no images are sent, encode all the images of the profile
        const images = await prisma.image.findMany({
            where: {
                id: { in: imageIds },
                profileId: profileId
            }
        });
        if(images.length === 0) throw new Error("Images not found");

        const imagePaths = images.map(image => `/files/${image.path}`);
        const imageIdsRead = images.map(image => image.id);

        logger.info(`Sending request to recognizer service to encode images for profile: ${profile.name}`);
        const responseEncoding = await  EncodingService.encode(imagePaths, profile.name ,sftpClient);

        
        logger.info(`Encoding images for profile: ${profile.name} was successful`);
        // Update the images to isCoded = true
        // Had to promisify the the loop because it was not waiting for the loop
        let codes = await new Promise<string[]>(resolve => {
            let codes: string[] = [];

            imageIdsRead.forEach(async (imageId, index) => {
                await prisma.image.update({
                    where: {
                        id: imageId
                    },
                    data: {
                        isCoded: true,
                        coder: responseEncoding[profile.name][index].embedding.toString()
                    }
                });
                codes.push(responseEncoding[profile.name][index].embedding.toString());

                if (index === imageIdsRead.length - 1) resolve(codes);
            });
        });

        const response = {
            message: "Encoding images was successful",
            images: imageIdsRead
        }

        return response;
    }
    
    static async update(id: string, image: ImageBaseDM): Promise<Image | null> {
        const imageUpdated = await prisma.image.update({
            where: {
                id: id
            },
            data: {
                ...image
            }
        });

        return imageUpdated;
    }

    static async delete(id: string): Promise<Image | null> {
        const image = await prisma.image.delete({
            where: {
                id: id
            }
        });

        return image;
    }

}