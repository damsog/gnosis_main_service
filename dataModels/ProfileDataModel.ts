import express from 'express';
const router = express.Router();

/**************************************************|Profile Data Models|**********************************************/
export interface ProfileBaseDM {
    name: string;
    bio: string;
    userId: string;

}

export interface ProfileDM extends ProfileBaseDM {
    id: String;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      profile:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              name:
 *                  type: string
 *                  description: name of the profile
 *              bio:
 *                  type: string
 *                  description: bio of the profile
 *              userId: 
 *                 type: integer
 *                 description: id of the user
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
 *      profileToCreate:
 *          type: object
 *          required:
 *              - name
 *              - userId
 *          properties:
 *              name:
 *                  type: string
 *                  description: name of the profile
 *              bio:
 *                  type: string
 *                  description: bio of the profile
 *              userId: 
 *                 type: string
 *                 description: id of the user
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      profileToUpdate:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: name of the profile
 *              bio:
 *                  type: string
 *                  description: bio of the profile
 *              userId: 
 *                 type: string
 *                 description: id of the user
*/

module.exports = router;