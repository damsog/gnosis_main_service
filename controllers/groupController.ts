import express from 'express';
import logger from '../lib/logger';
import { GroupService } from '../services/groupService';
const router = express.Router();


/**
 * @swagger
 * /api/group:
 *  get:
 *      summary: Returns all groups
 *      security:
 *          - bearerAuth: []
 *      tags: [Groups]
 *      responses:
 *          200:
 *              description: list of every group
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
router.get('/', async (req, res) => {
    const groups = await GroupService.getAll();
    return res.status(200).json(groups);
});

/**
 * @swagger
 * /api/group/{id}:
 *  get:
 *      summary: Return a group given its id
 *      security:
 *          - bearerAuth: []
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: group id
 *      responses:
 *          200:
 *              description: Group information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const group = await GroupService.getById(id);
        if(group) return res.status(200).json(group);

        return res.status(204).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/group/user/{userId}:
 *  get:
 *      summary: Return all groups for a user
 *      security:
 *          - bearerAuth: []
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: userId
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: list of all groups for a user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
router.get('/user/:userId', async (req, res) => {
    try{
        const { userId } = req.params;
        const groups = await GroupService.getByUserId(userId);
        if(groups) return res.status(200).json(groups);

        return res.status(204).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/group:
 *  post:
 *      summary: Create a new group associating it with a user
 *      security:
 *          - bearerAuth: []
 *      tags: [Groups]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/groupToCreate'
 *      responses:
 *          200:
 *              description: Group just created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
router.post('/', async (req, res) => {
    const { body } = req;
    try{
        if(
            "name" in body && typeof body.name === "string" &&
            "userId" in body && typeof body.userId === "string"
        ){
            const group = await GroupService.create(body);
            return res.status(201).json(group);
        }

        return res.status(400).json({ message: "Invalid request" });
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/group/{id}:
 *  put:
 *      summary: Updates group info
 *      security:
 *          - bearerAuth: []
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Group id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/groupToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/group'
 *          404:
 *              description: User not found
 *                                
 */
router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const group = await GroupService.update(id, req.body);
        if(group) return res.status(200).json(group);

        return res.status(204).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/group/dataset/{id}:
 *  get:
 *      summary: Generates a dataset for a group
 *      security:
 *          - bearerAuth: []
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: group id
 *      responses:
 *          200:
 *              description: Group information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
 router.get('/dataset/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const group = await GroupService.generateDataset(id);
        if(group) return res.status(200).json(group);

        return res.status(204).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/group/dataset/{id}:
 *  put:
 *      summary: Deletes a dataset for a group
 *      security:
 *          - bearerAuth: []
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: group id
 *      responses:
 *          200:
 *              description: Group information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
router.put('/dataset/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const group = await GroupService.deleteDataset(id);
        if(group) return res.status(200).json(group);

        return res.status(204).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/group/{id}:
 *  delete:
 *      summary: Deletes a group given an id
 *      security:
 *          - bearerAuth: []
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: group id
 *      responses:
 *          200:
 *              description: Operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: User not found
 *                                
 */
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const group = await GroupService.delete(id);
        return res.status(200).json(group);
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

module.exports = router;