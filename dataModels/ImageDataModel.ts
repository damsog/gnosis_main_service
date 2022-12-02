import express from 'express';
const router = express.Router();

/**************************************************|Image Data Models|**********************************************/
export interface ImageBaseDM {
    name: string;
    path: string;
    coder: string;
    isCoded: boolean;
    profileId: string
}

export interface ImageDM extends ImageBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ImagesToCodeDM {
    imagesIds: string[];
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
 *              name:
 *                  type: string
 *                  description: Route of the refference img
 *              path:
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
 *              name:
 *                  type: string
 *                  description: Route of the refference img
 *              profileId:
 *                  type: string
 *                  description: id of the parent profile 
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      imageToUpdate:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Route of the refference img
 *              profileId:
 *                  type: string
 *                  description: id of the parent profile 
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      imagesToCode:
 *          type: object
 *          properties:
 *               profileId:
 *               imageIds:
 *                   type: array
 *                   items:
 *                       type: string
 *                   description: Route of the refference img
*/

module.exports = router;