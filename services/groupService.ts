import prisma from '../configurations/dbinit';
import { Group } from '@prisma/client';
import { GroupBaseDM, GroupDM } from '../dataModels/GroupDataModel';
import { EncodingService } from './encodingService';
import sftp from '../configurations/sftpinit';
import { ImageService } from './imageService';
import logger from '../lib/logger';
import SftpService from './sftpService';

export class GroupService {
    static async getAll(): Promise<Group[]> {
        const groups = await prisma.group.findMany();
        return groups;
    }

    static async getById(id: string): Promise<Group | null> {
        const group =  await prisma.group.findFirst({
            where: {
                id: id
            }
        });

        return group;
    }

    static async getByName(name: string): Promise<Group | null> {
        const group = await prisma.group.findFirst({
            where: {
                name: name
            }
        });

        return group;
    }

    static async getByUserId(userId: string): Promise<Group[]> {
        const groups = await prisma.group.findMany({
            where: {
                userId: userId
            }
        });

        return groups;
    }

    static async getWithAllElements(id: string){
        const group = await prisma.group.findFirst({
            where: {
                id: id
            },
            include: {
                ProfileGroup: {
                    include: {
                        profile: {
                            include: {
                                Image: true
                            }
                        }
                    }
                }
            }
        });
            
        return group;
    }

    static async create(group: GroupBaseDM): Promise<Group> {
        const groupCreated = await prisma.group.create({
            data: {
                ...group
            }
        });

        return groupCreated;
    }
    
    static async update(id: string, group: GroupBaseDM): Promise<Group | null> {
        const groupUpdated = await prisma.group.update({
            where: {
                id: id
            },
            data: {
                ...group
            }
        });

        return groupUpdated;
    }

    static async generateDataset(id: string): Promise<Group | null> {
        // Get the group with all the profiles and images
        const group = await GroupService.getWithAllElements(id);

        if(!(group)) return null;

        if(group.ProfileGroup.length === 0) return null;

        // Before generating the Dataset, we have to make sure every image is coded.
        // Calling the encoding service to encode the images for each profile
        for(const profileGroup of group.ProfileGroup) {
            const profile = profileGroup.profile;
            // Gets the images that are not encoded. then, if there are some, sends them together to the encoding service
            const imagesToCode = profile.Image.filter(image => image.isCoded === false);
            if(imagesToCode.length > 0) {
                logger.info(`There are images to code for profile ${profile.id}`);
                const imagesToCodeIds = imagesToCode.map(image => image.id);
                // Call the encoding service
                const encodingResult = await ImageService.encodeImages(imagesToCodeIds, profile.id, sftp);
                // If the encoding service fails, throw an error
                if(!(encodingResult)) throw new Error('Encoding failed');
            }
        }
        
        // Once all the images are encoded, we can generate the dataset
        let dataset: [string,string][] = [];
        // Get the group with all the profiles and images updated
        const groupUpdated = await GroupService.getWithAllElements(id);

        for(const profileGroup of groupUpdated!.ProfileGroup) {
            const profile = profileGroup.profile;

            logger.info(`Adding profile ${profile.id} to the Dataset for group ${group.id}`);
            // With all the images encoded, append the codes to the dataset
            profile.Image.forEach(image => {
                if(image.coder === null) throw new Error('Image coder is null');
                dataset.push([profile.name, image.coder]);
            });
        }

        if(dataset.length === 0) throw new Error('Dataset is empty');

        // Save the dataset to the sftp server and database
        const datasetSaved = await GroupService.saveDataset(dataset, id, sftp);
        if(!(datasetSaved)) throw new Error('Dataset could not be saved');

        // Update the group with the dataset
        const groupUdatedDataset = await GroupService.update(id, {  dataset:`${groupUpdated!.id}.json`,allImagesCoded: true } as GroupBaseDM);

        return groupUdatedDataset;
    }

    static async deleteDataset(id: string): Promise<Group | null> {
        const group = await prisma.group.update({
            where: {
                id: id
            },
            data: {
                dataset: null,
                allImagesCoded: false
            }
        });
        
        return group;
    }

    static async saveDataset(dataset: [string, string][], id: string, sftpClient: any): Promise<boolean> {
        // Save the dataset to the sftp server
        
        const sftpService = new SftpService(sftpClient);
        
        const datasetBuffer = Buffer.from(JSON.stringify(dataset));

        await sftpService.upload(datasetBuffer,`/files/${id}.json`);
        logger.debug(`upload: dataset for group ${id} to /files/${id}`);

        return true;
    }

    static async delete(id: string): Promise<Group | null> {
        const group = await prisma.group.delete({
            where: {
                id: id
            }
        });

        return group;
    }

}