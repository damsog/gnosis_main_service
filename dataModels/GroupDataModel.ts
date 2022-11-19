import express from 'express';
const router = express.Router();

/**************************************************|Group Data Models|**********************************************/
export interface GroupBaseDM {
    name: string;
    description: string;
    dataset: string;
    allImagesCoded: boolean;
    userId: string;
}

export interface GroupDM extends GroupBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      group:
 *          type: object
 *          required:
 *              - name
 *              - dataset
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-generated id of the user
 *              name:
 *                  type: string
 *                  description: Full name of the profile
 *              description:
 *                  type: string
 *                  description: Group description
 *              dataset:
 *                  type: string
 *                  description: route where the dataset resides
 *              allImagesCoded:
 *                  type: boolean
 *                  description: if all images are coded
 *              userId:
 *                  type: int
 *                  description: id of the parent user
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
 *      groupToCreate:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: Full name of the profile
 *              description:
 *                  type: string
 *                  description: Group description
 *              dataset:
 *                  type: string
 *                  description: route where the dataset resides
 *              userId:
 *                  type: int
 *                  description: id of the parent user
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      groupToUpdate:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Full name of the profile
 *              description:
 *                  type: string
 *                  description: Group description
 *              dataset:
 *                  type: string
 *                  description: route where the dataset resides
 *              userId:
 *                  type: int
 *                  description: id of the parent user
*/

module.exports = router;