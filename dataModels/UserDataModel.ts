import express from 'express';
const router = express.Router();

/**************************************************|User Data Models|**********************************************/
export interface UserBaseDM {
    name: string | null | undefined;
    email: string;
    password: string;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    image: string | null | undefined;
    emailVerified: Date | null | undefined;
    apiKey: string | null | undefined;
}

export interface UserDM extends UserBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      user:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the user
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
 *              emailVerified:
 *                 type: boolean
 *                 description: if the email is verified
 *              apiKey:
 *                  type: string
 *                  description: key to use the api
 *              createdAt:
 *                  type: string
 *                  description: time
 *              updatedAt:
 *                  type: string
 *                  description: time
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      userToUpdate:
 *          type: object
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

// Exporting so swagger can read the models
module.exports = router;