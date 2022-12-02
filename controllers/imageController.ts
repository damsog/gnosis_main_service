import express, { Request } from 'express';
import { ImageService } from '../services/imageService';
const router = express.Router();
import Formidable, { Fields, Files } from 'formidable';
import path from 'path';
import logger from '../lib/logger';
import { ImageBaseDM, ImagesToCodeDM } from '../dataModels/ImageDataModel';
import sftp from '../configurations/sftpinit';

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
 *      parameters:
 *          -   in: query
 *              name: name
 *              schema:
 *                  type: string
 *              required: true
 *              description: Name of the image
 *          -   in: query
 *              name: profileId
 *              schema:
 *                  type: string
 *              required: true
 *              description: Profile id
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          profilePicture:
 *                              type: string
 *                              format: binary
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
interface ImageQueryParams {
    name: string;
    profileId: string;
}
router.post('/', async (req: Request<{}, any, any, ImageQueryParams>, res) => {
    const { name, profileId } = req.query;
    logger.debug(JSON.stringify(req.body));
    if(req.body === undefined) return res.status(400).json({ message: 'No image provided' });
    
    try{
        var imageData: ImageBaseDM = {
            name: name,
            path: '',
            coder: '',
            isCoded: false,
            profileId: profileId
        };

        const publicFolder = path.join(__dirname, "../tmp/");
        let form = new Formidable.IncomingForm();
        
        const filePath = await new Promise<string>(
            async (resolve, reject) => {
                
                try{
                    var fileName: string | null = '';
                    form.parse(req);

                    form.on('fileBegin', (name, file) => {
                        fileName = `${imageData.name}${path.extname(file.originalFilename!)}`;
                        logger.debug(`Read data, filename ${fileName}`);
                        file.filepath = `${publicFolder}${fileName}`;
                    });

                    form.on('file', async (name, file) => {
                        logger.debug(`Uploading ${fileName}`);
                    });

                    form.on('error', (err) => {
                        logger.error(err);
                        reject(err);
                    });

                    form.on('end', () => {
                        logger.debug(`File uploaded: ${fileName}`);
                        resolve(fileName!);
                    });
                }catch(err){
                    logger.error(err);
                    reject(err);
                }
            }
        )

        if(filePath === null) return res.status(400).json({ message: 'No image provided' });

        // File uploaded
        imageData.name = filePath;
        imageData.path = `${profileId}/${filePath}`;
        logger.debug(`image data: ${imageData.path}`);
        const image = await ImageService.create(imageData, sftp);
        return res.status(201).json(image);
    }catch(err){
        logger.error(err);
        return res.status(500).json(err);
    }
});

/**
 * @swagger
 * /api/image/encode:
 *  post:
 *      summary: Encode an image
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/imagesToCode'
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
router.post('/encode', async (req, res) => {
    const { body } = req;
    try{
        if(!("profileId" in body && typeof body.profileId === 'string')) return res.status(400).json("Bad request");
        if( "imageIds" in body){
            if(!Array.isArray(body.imageIds)) return res.status(400).json("Bad request");
            if(body.imageIds.length === 0) return res.status(400).json("Bad request");
        }
                    
        const encodedImage = await ImageService.encodeImages(body.imageIds, body.profileId ,sftp);
        
        return res.status(200).json(encodedImage);
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json(error.message);
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
