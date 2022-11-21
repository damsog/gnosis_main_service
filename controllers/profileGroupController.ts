import express from 'express';
import { ProfileGroupService } from '../services/profileGroupService';
const router = express.Router();

/**
 * @swagger
 * /api/profile-group:
 *  get:
 *      summary: Return all Profile Groups
 *      security:
 *          - bearerAuth: []
 *      tags: [Profile-Groups]
 *      responses:
 *          200:
 *              description: list of all profile groups
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/profileGroup'
 *                                
 */
router.get('/', async (req, res) => {
    const profileGroups = await ProfileGroupService.getAll();
    res.send(profileGroups);
});

/**
 * @swagger
 * /api/profile-group/{id}:
 *  get:
 *      summary: Return a profile group given its id
 *      security:
 *          - bearerAuth: []
 *      tags: [Profile-Groups]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: profile group id
 *      responses:
 *          200:
 *              description: Profile Group for the id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/profileGroup'
 *                                
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const profileGroup = await ProfileGroupService.getById(id);
        if(profileGroup) return res.status(200).send(profileGroup);

        return res.status(204).send();
    }catch(error: any){
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/profile-group:
 *  post:
 *      summary: Create a new profile group
 *      security:
 *          - bearerAuth: []
 *      tags: [Profile-Groups]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/profileGroupToCreate'
 *      responses:
 *          200:
 *              description: Profile Group created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/profileGroup'
 *                                
 */
router.post('/', async (req, res) => {
    const { body } = req;
    try{
        if(
            "profileId" in body && typeof body.profileId === "string" &&
            "groupId" in body && typeof body.groupId === "string"
        ){
            const profileGroup = await ProfileGroupService.create(body);
            return res.status(201).send(profileGroup);
        }
        return res.status(400).json({ message: "Invalid request" });
    }catch(error: any){
        return res.status(500).json({error: error.message});
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const profileGroup = await ProfileGroupService.update(id, req.body);
        if(profileGroup) return res.status(200).send(profileGroup);

        return res.status(204).send();
    }catch(error: any){
        return res.status(500).json({error: error.message});
    }
});

/**
 * @swagger
 * /api/profile-group/{id}:
 *  delete:
 *      summary: Deletes a Profile-Group Relation given an id
 *      security:
 *          - bearerAuth: []
 *      tags: [Profile-Groups]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: profile group id
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
    const { id } = req.params;
    try{
        const profileGroup = await ProfileGroupService.delete(id);
        if(profileGroup) return res.status(200).send(profileGroup);

        return res.status(204).send();
    }catch(error: any){
        return res.status(500).json({error: error.message});
    }
});

module.exports = router;

