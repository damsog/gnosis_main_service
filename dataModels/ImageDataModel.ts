import express from 'express';
const router = express.Router();

/**************************************************|Image Data Models|**********************************************/
export interface ImageBaseDM {
    imageFile: String;
    coder: String;
    isCoded: Boolean;
    profileId: String
}

export interface ImageDM extends ImageBaseDM {
    id: String;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      image:
 *          type: object
 *          required:
 *              - coder_img_route
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-generated id of the coder
 *              imageFile:
 *                  type: string
 *                  description: Route of the refference img
 *              coder:
 *                  type: string
 *                  description: coder generated for the image
 *              isCoded:
 *                  type: boolean
 *                  description: if the image is coded or not
 *              profileId:
 *                  type: int
 *                  description: id of the parent profile
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
 *      imageToCreate:
 *          type: object
 *          required:
 *              - imageFile
 *          properties:
 *              imageFile:
 *                  type: string
 *                  description: Route of the refference img
 *              coder:
 *                  type: string
 *                  description: coder generated for the image
 *              isCoded:
 *                  type: boolean
 *                  description: if the image is coded or not
 *              profileId:
 *                  type: int
 *                  description: id of the parent profile 
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      imageToUpdate:
 *          type: object
 *          properties:
 *              imageFile:
 *                  type: string
 *                  description: Route of the refference img
 *              coder:
 *                  type: string
 *                  description: coder generated for the image
 *              isCoded:
 *                  type: boolean
 *                  description: if the image is coded or not
 *              profileId:
 *                  type: int
 *                  description: id of the parent profile 
*/

module.exports = router;