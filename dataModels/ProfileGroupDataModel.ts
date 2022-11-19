import { group } from 'console';
import express from 'express';
const router = express.Router();

/**************************************************|ProfileGroup Data Models|**********************************************/
export interface ProfileGroupBaseDM {
    profileId: string;
    groupId: string;
}

export interface ProfileGroupDM extends ProfileGroupBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}


/**
 * @swagger
 * components:
 *  schemas:
 *      profileGroup:
 *          type: object
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-generated id of the user
 *              profileId:
 *                  type: string
 *                  description: if of a belonging profile
 *              groupId:
 *                  type: string
 *                  description: id of the parent group
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
 *      profileGroupToCreate:
 *          type: object
 *          required:
 *              - profileId
 *              - groupId
 *          properties:
 *              profileId:
 *                  type: string
 *                  description: if of a belonging profile
 *              groupId:
 *                  type: string
 *                  description: id of the parent group
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      profileGroupToUpdate:
 *          type: object
 *          properties:
 *              profileId:
 *                  type: string
 *                  description: if of a belonging profile
 *              groupId:
 *                  type: string
 *                  description: id of the parent group
*/

module.exports = router;