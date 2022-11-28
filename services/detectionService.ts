import { PeerConnectionDM } from '../dataModels/PeerConnectionModel';
import axios from 'axios';
import logger from '../lib/logger';

export class DetectionService{
    static async startDetectionStream(offerSdp: string, offerType: string): Promise<PeerConnectionDM> {
        var payload = JSON.stringify({ 
            "sdp" : offerSdp, 
            "sdp_type" : offerType
        });

        // Setting configuration of the request
        var url = `http://${process.env.FACE_ANALYTICS_SERVER}:${process.env.FACE_ANALYTICS_PORT}/detector/stream`;
        var config = {
            method: 'post',
            url: url,
            headers: {'Content-Type':'application/json'},
            data: payload
        };

        // Requesting to the Recognition Service
        // Getting response for the signaling
        const faservice_response = await axios(config).then((result) =>{
            return result.data;
        });

        const answerSdp = {
            "sdp" : faservice_response["sdp"],
            "type" : faservice_response["type"]
        };

        return answerSdp;
    }
}