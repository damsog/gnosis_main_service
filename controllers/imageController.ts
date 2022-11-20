import express from 'express';
import { ImageService } from '../services/imageService';
const router = express.Router();

/**
 * @swagger
 * /api/image:
 *  get:
 *      summary: Returns all images
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      responses:
 *          200:
 *              description: list of every image
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/image'
 *                                
 */
router.get('/', async (req, res) => {
    const images = await ImageService.getAll();
    return res.status(200).json(images);
});

/**
 * @swagger
 * /api/image/{id}:
 *  get:
 *      summary: Return an image given its id
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: coder id
 *      responses:
 *          200:
 *              description: Coder information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/image'
 *                                
 */
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const image = await ImageService.getById(id);
        if(image) return res.status(200).json(image);

        return res.status(204).json();
    }catch(err){
        return res.status(500).json(err);
    }
});

/**
 * @swagger
 * /api/image/profile/{profileId}:
 *  get:
 *      summary: Return an image given its id
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
 *          -   in: path
 *              name: profileId
 *              schema:
 *                  type: string
 *              required: true
 *              description: Profile id
 *      responses:
 *          200:
 *              description: Coder information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/image'
 *                                
 */
router.get('/profile/:profileId', async (req, res) => {
    try{
        const { profileId } = req.params;
        const images = await ImageService.getByProfileId(profileId);
        if(images) return res.status(200).json(images);

        return res.status(204).json();
    }catch(err){
        return res.status(500).json(err);
    }
});

/**
 * @swagger
 * /api/image/user/{userId}:
 *  get:
 *      summary: Return an image given its id
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
 *          -   in: path
 *              name: userId
 *              schema:
 *                  type: string
 *              required: true
 *              description: User id
 *      responses:
 *          200:
 *              description: Coder information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/image'
 *                                
 */
router.get('/user/:userId', async (req, res) => {
    try{
        const { userId } = req.params;
        const images = await ImageService.getByUserId(userId);
        if(images) return res.status(200).json(images);

        return res.status(204).json();
    }catch(err){
        return res.status(500).json(err);
    }
});

/**
 * @swagger
 * /api/image:
 *  post:
 *      summary: Create a new image associating to a profile
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/imageToCreate'
 *      responses:
 *          200:
 *              description: Image just created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/image'
 *                                
 */
router.post('/', async (req, res) => {
    const { body } = req;
    try{
        if(
            "name" in body && typeof body.name === "string" &&
            "profileId" in body && typeof body.profileId === "string"
        ){
            const image = await ImageService.create(body);
            return res.status(201).json(image);
        }
        return res.status(400).json();
    }catch(err){
        return res.status(500).json(err);
    }
});

/**
 * @swagger
 * /api/image/{id}:
 *  put:
 *      summary: Update an image
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Image id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/imageToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/image'
 *          404:
 *              description: Coder not found
 *                                
 */
router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const image = await ImageService.update(id, req.body);
        if(image) return res.status(200).json(image);

        return res.status(204).json();
    }catch(err){
        return res.status(500).json(err);
    }
});

/**
 * @swagger
 * /api/image/{id}:
 *  delete:
 *      summary: Deletes an image given an id
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Image id
 *      responses:
 *          200:
 *              description: Operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: Image not found
 *                                
 */
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const image = await ImageService.delete(id);
        return res.status(200).json(image);
    }catch(err){
        return res.status(500).json(err);
    }
});

module.exports = router;
