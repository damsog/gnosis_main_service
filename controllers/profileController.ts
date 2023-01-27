import express from 'express';
import logger from '../lib/logger';
const router = express.Router();
import { ProfileService } from '../services/profileService';

/**
 * @swagger
 * /api/profile:
 *  get:
 *      summary: Return all profiles
 *      security:
 *          - bearerAuth: []
 *      tags: [Profiles]
 *      responses:
 *          200:
 *              description: list of all profiles
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/profile'
 *                                
 */
router.get('/', async (req, res) => {
    const profiles = await ProfileService.getAll();
    return res.status(200).json(profiles);
});

/**
 * @swagger
 * /api/profile/{id}:
 *  get:
 *      summary: Return a profile given its id
 *      security:
 *          - bearerAuth: []
 *      tags: [Profiles]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: profile id
 *      responses:
 *          200:
 *              description: Profile for the id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/profile'
 *                                
 */
router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const profile = await ProfileService.getById(id);
        if(profile) return res.status(200).json(profile);

        return res.status(204).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/profile/user/{userId}:
 *  get:
 *      summary: Return all profiles for a user
 *      security:
 *          - bearerAuth: []
 *      tags: [Profiles]
 *      parameters:
 *          -   in: path
 *              name: userId
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: list of all profiles for a user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/profile'
 *                                
 */

router.get('/user/:userId', async (req, res) => {
    try{
        const { userId } = req.params;
        const profiles = await ProfileService.getByUserId(userId);
        if(profiles) return res.status(200).json(profiles);

        return res.status(204).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/profile/group/{groupId}:
 *  get:
 *      summary: Return all profiles in a group
 *      security:
 *          - bearerAuth: []
 *      tags: [Profiles]
 *      parameters:
 *          -   in: path
 *              name: groupId
 *              schema:
 *                  type: string
 *              required: true
 *              description: group id
 *      responses:
 *          200:
 *              description: list of all profiles in a group
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/profile'
 *                                
 */

 router.get('/group/:groupId', async (req, res) => {
    try{
        const { groupId } = req.params;
        const profiles = await ProfileService.getByGroupId(groupId);
        if(profiles) return res.status(200).json(profiles);

        return res.status(204).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/profile/not-belong-group/{groupId}:
 *  get:
 *      summary: Return all profiles that do not belong to a group for a user
 *      security:
 *          - bearerAuth: []
 *      tags: [Profiles]
 *      parameters:
 *          -   in: path
 *              name: groupId
 *              schema:
 *                  type: string
 *              required: true
 *              description: group id
 *      responses:
 *          200:
 *              description: list of all profiles in a group
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/profile'
 *                                
 */

router.get('/not-belong-group/:groupId', async (req, res) => {
    try{
        const { groupId } = req.params;
        const profiles = await ProfileService.getNotBelongingToGroupId(groupId);
        if(profiles) return res.status(200).json(profiles);

        return res.status(204).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});


/**
 * @swagger
 * /api/profile:
 *  post:
 *      summary: Create a new profile associating it with a user
 *      security:
 *          - bearerAuth: []
 *      tags: [Profiles]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/profileToCreate'
 *      responses:
 *          200:
 *              description: profile just created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/profile'
 *                                
 */
router.post('/', async (req, res) => {
    const { body } = req;
    try{
        if (
            "name" in body && typeof body.name === "string" &&
            "userId" in body && typeof body.userId === "string"
        ) {
            const profile = await ProfileService.create(body);

            return res.status(201).json(profile);
        }
        return res.status(400).json({ message: "Invalid request" });
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/profile/{id}:
 *  put:
 *      summary: Updates profile info
 *      security:
 *          - bearerAuth: []
 *      tags: [Profiles]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: profile id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/profileToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/profile'
 *          404:
 *              description: User not found
 *                                
 */
router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { body } = req;
        const profile = await ProfileService.update(id, body);
        if(profile) return res.status(200).json(profile);

        return res.status(204).json();
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/profile/{id}:
 *  delete:
 *      summary: Deletes a profile given an id
 *      security:
 *          - bearerAuth: []
 *      tags: [Profiles]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: profile id
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
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const profile = await ProfileService.delete(id);

        return res.status(200).json(profile);
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json({error: error.message});
    }
});

module.exports = router;