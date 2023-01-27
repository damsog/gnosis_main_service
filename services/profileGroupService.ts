import prisma from '../configurations/dbinit';
import { ProfileGroup } from '@prisma/client';
import { ProfileGroupBaseDM, ProfileGroupBaseMDM, ProfileGroupDM } from '../dataModels/ProfileGroupDataModel';

export class ProfileGroupService {
    static async getAll(): Promise<ProfileGroup[]> {
        const profileGroups = await prisma.profileGroup.findMany();
        return profileGroups;
    }

    static async getById(id: string): Promise<ProfileGroup | null> {
        const profileGroup =  await prisma.profileGroup.findFirst({
            where: {
                id: id
            }
        });

        return profileGroup;
    }

    static async createMultiple(profileGroupsToCreate: ProfileGroupBaseMDM): Promise<ProfileGroup[]> {
        const profileIds = profileGroupsToCreate.profileIds;
        let profileGroupsCreated: ProfileGroup[] = [];

        // Loop through the profileIds and create a profileGroup for each
        for(const profileId of profileIds) {
            const data = {groupId: profileGroupsToCreate.groupId, profileId: profileId}

            const profileGroupCreated = await prisma.profileGroup.create({
                data: {
                    ...data
                }
            });

            profileGroupsCreated.push(profileGroupCreated);
        }

        return profileGroupsCreated;
    }

    static async create(profileGroup: ProfileGroupBaseDM): Promise<ProfileGroup> {
        const profileGroupCreated = await prisma.profileGroup.create({
            data: {
                ...profileGroup
            }
        });

        return profileGroupCreated;
    }
    
    static async update(id: string, profileGroup: ProfileGroupBaseDM): Promise<ProfileGroup | null> {
        const profileGroupUpdated = await prisma.profileGroup.update({
            where: {
                id: id
            },
            data: {
                ...profileGroup
            }
        });

        return profileGroupUpdated;
    }

    static async delete(id: string): Promise<ProfileGroup | null> {
        const profileGroup = await prisma.profileGroup.delete({
            where: {
                id: id
            }
        });

        return profileGroup;
    }

}