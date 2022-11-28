import express from 'express';
import logger from '../lib/logger';
import { DetectionService } from '../services/detectionService';
const router = express.Router();

router.post('/stream', async (req, res) => {
    try{
        const { sdp, type } = req.body;
        const answerSdp = await DetectionService.startDetectionStream(sdp, type);

        return res.status(200).json(answerSdp);
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json(error);
    }
});

module.exports = router;