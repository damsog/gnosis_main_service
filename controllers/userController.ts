import express from 'express';
import { RequestWithUser } from '../dataModels/AuthenticationModels';
import logger from '../lib/logger';
const router = express.Router();
import { UserService } from '../services/userService';

/**
 * @swagger
 * /api/user/getall/{all}:
 *  get:
 *      summary: Return all users
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: list of all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/user'
 *                                
 */

router.get('/getall/:getall', async (req, res) => {
    const users = await UserService.getAll();
    return res.status(200).json(users);
});

/**
 * @swagger
 * /api/user/id/{id}:
 *  get:
 *      summary: Return user by id
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: User
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                                               
 */

router.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const user = await UserService.getById(id);
        if(user) return res.status(200).json(user);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/user/email/{email}:
 *  get:
 *      summary: Return user by email
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: email
 *              schema:
 *                  type: string
 *              required: true
 *              description: user email
 *      responses:
 *          200:
 *              description: User
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                                               
 */

router.get('/email/:email', async (req, res) => {
    const { email } = req.params;
    try{
        const user = await UserService.getEmail(email);
        if(user) return res.status(200).json(user);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: Return user info
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: User
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                                               
 */

 router.get('/', async (req: RequestWithUser, res) => {
    const { user } = req;
    try{
        const userRead = await UserService.getById(user.userId);
        if(userRead) return res.status(200).json(userRead);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/user/id/{id}:
 *  put:
 *      summary: Updates user
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                
 */

router.put('/id/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try{
        const user = await UserService.update(id, body);
        if(user) return res.status(200).json(user);
        
        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/user:
 *  put:
 *      summary: Updates user
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                
 */

 router.put('/', async (req: RequestWithUser, res) => {
    const { body } = req;
    const { user } = req;
    try{
        const userUdated = await UserService.update(user.userId, body);
        if(userUdated) return res.status(200).json(userUdated);
        
        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/user/id/{id}:
 *  delete:
 *      summary: Deletes a user by id
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: User not found
 *                                
 */

router.delete('/id/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const user = await UserService.delete(id);
        if(user) return res.status(200).json(user);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/user:
 *  delete:
 *      summary: Deletes a user by id
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: User not found
 *                                
 */

 router.delete('/', async (req: RequestWithUser, res) => {
    const { user } = req;
    try{
        const userDeleted = await UserService.delete(user.userId);
        if(userDeleted) return res.status(200).json(userDeleted);

        return res.status(404).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

module.exports = router;