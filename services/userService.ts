import prisma from '../configurations/dbinit';
import { User } from '@prisma/client';
import { UserBaseDM } from '../dataModels/UserDataModel';

export class UserService {
    static async getAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }

    static async getById(id: string): Promise<User | null> {
        const user =  await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        return user;
    }

    static async getEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        return user;
    }
    
    static async update(id: string, user: UserBaseDM): Promise<User | null> {
        const userUpdated = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                ...user
            }
        });

        return userUpdated;
    }

    static async delete(id: string): Promise<User | null> {
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        });

        return user;
    }

}