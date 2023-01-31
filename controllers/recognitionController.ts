import express, { Request } from 'express';
import logger from '../lib/logger';
import { RecognitionService } from '../services/recognitionService';
import sftp from '../configurations/sftpinit';

const router = express.Router();

interface RecognitionStreamQueryParams {
    groupId: string;
}
router.post('/stream', async (req: Request<{}, any, any, RecognitionStreamQueryParams>, res) => {
    //var { groupId } = req.query;
    try{
        const { sdp, type, groupId } = req.body;
        const answerSdp = await RecognitionService.startRecognitionStream(sdp, type, groupId, sftp);

        return res.status(200).json(answerSdp);
    }catch(error: any){
        logger.error(error.message);
        return res.status(500).json(error);
    }
});

module.exports = router;