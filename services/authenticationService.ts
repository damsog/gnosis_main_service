import { User } from "@prisma/client";
import { UserBaseDM } from "../dataModels/UserDataModel";
import { Encryptor } from "../lib/encryptor";
import prisma from '../configurations/dbinit';
import { UserService } from "./userService";
import jwt from "jsonwebtoken";
import logger from "../lib/logger";

export class AuthenticationService {

    static async login(email: string, password: string) {
        if(!email || !password) { throw new Error("Username and password are required"); }

        const user = await UserService.getEmail(email);
        if (!user) { throw new Error("User not found");}
        
        // Matching password
        if( !(await Encryptor.matchPassword(password, user.password)) ){ throw new Error("Invalid Credentials"); }
        
        logger.debug( `Password matched` );
        // Creating an access token for the user
        const token = jwt.sign(
            {
                userId: user.id, 
                userEmail: email
            },
            process.env.TOKEN_KEY!,
            {expiresIn: "1h"}
        );
        logger.debug( `Token generated: ${token}` );
        
        // Appends the token to the response | Weird casting from moongoose object to JSON
        let userJson = JSON.parse(JSON.stringify(user));
        userJson.token = `Bearer ${token}`;

        return userJson;
    }

    static async register(user: UserBaseDM): Promise<User> {
        const encryptPassword:string = await Encryptor.encryptPassword(user.password);

        // Ecrpt the password
        user.password = encryptPassword;

        const userCreated = await prisma.user.create({
            data: {
                ...user
            }
        });

        return userCreated;
    }

}