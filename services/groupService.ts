import prisma from '../configurations/dbinit';
import { Group } from '@prisma/client';
import { GroupBaseDM, GroupDM } from '../dataModels/GroupDataModel';

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

    static async delete(id: string): Promise<Group | null> {
        const group = await prisma.group.delete({
            where: {
                id: id
            }
        });

        return group;
    }

}