import express from 'express';
import { Request } from 'express';
const router = express.Router();

/**************************************************|Auth Data Models|**********************************************/
export interface UserRegisterDM {
    name: string;
    email: string;
    password: string;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    image: string | null | undefined;
    emailVerified: Date | null | undefined;
}

export interface LoginDM {
    email: string;
    password: string;
}

export interface RequestWithUser extends Request {
    user?: any;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      userToCreate:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              name:
 *                  type: string
 *                  description: Username set by user
 *              email:
 *                  type: string
 *                  description: Email set by user
 *              password:
 *                  type: string
 *                  description: key to access
 *              firstName:
 *                  type: string
 *                  description: first name of the user
 *              lastName:
 *                  type: string
 *                  description: last name of the user
 *              image: 
 *                 type: string 
 *                 description: image of the user
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: Email set by user
 *              password:
 *                  type: string
 *                  description: key to access
*/

// Exporting so swagger can read the models
module.exports = router;