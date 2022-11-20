import prisma from '../configurations/dbinit';
import { Image } from '@prisma/client';
import { ImageBaseDM, ImageDM } from '../dataModels/ImageDataModel';

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

    static async create(image: ImageBaseDM): Promise<Image> {
        const imageCreated = await prisma.image.create({
            data: {
                ...image
            }
        });

        return imageCreated;
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