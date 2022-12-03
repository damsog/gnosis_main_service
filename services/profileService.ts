import prisma from '../configurations/dbinit';
import { Profile } from '@prisma/client';
import { ProfileBaseDM, ProfileDM } from '../dataModels/ProfileDataModel';


export class ProfileService {
    static async getAll(): Promise<Profile[]> {
        const profiles = await prisma.profile.findMany();
        return profiles;
    }

    static async getById(id: string): Promise<Profile | null> {
        const profile =  await prisma.profile.findFirst({
            where: {
                id: id
            }
        });

        return profile;
    }

    static async getByUserId(userId: string): Promise<Profile[]> {
        const profiles = await prisma.profile.findMany({
            where: {
                userId: userId
            }
        });

        return profiles;
    }

    static async getByGroupId(groupId: string): Promise<Profile[]> {
        const profiles = await prisma.profile.findMany({
            where: {
                ProfileGroup: {
                    some: {
                        groupId: groupId
                    }
                }
            }
        });
        
        return profiles;
    }

    static async getByName(name: string): Promise<Profile | null> {
        const profile = await prisma.profile.findFirst({
            where: {
                name: name
            }
        });

        return profile;
    }

    static async create(profile: ProfileBaseDM): Promise<Profile> {
        const profileCreated = await prisma.profile.create({
            data: {
                ...profile
            }
        });

        return profileCreated;
    }
    
    static async update(id: string, profile: ProfileBaseDM): Promise<Profile | null> {
        const profileUpdated = await prisma.profile.update({
            where: {
                id: id
            },
            data: {
                ...profile
            }
        });

        return profileUpdated;
    }

    static async delete(id: string): Promise<Profile | null> {
        const profile = await prisma.profile.delete({
            where: {
                id: id
            }
        });

        return profile;
    }

}