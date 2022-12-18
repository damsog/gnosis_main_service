import { PeerConnectionDM } from '../dataModels/PeerConnectionModel';
import axios from 'axios';
import logger from '../lib/logger';
import formdata from 'form-data';

export class DetectionService{
    static async startDetectionStream(offerSdp: string, offerType: string): Promise<PeerConnectionDM> {
        let form = new formdata();

        // Adding the sdp to the form
        form.append('sdp', offerSdp);
        form.append('sdp_type', offerType);

        // Setting configuration of the request
        var url = `http://${process.env.FACE_ANALYTICS_SERVER}:${process.env.FACE_ANALYTICS_PORT}/detector/stream`;

        // Requesting to the Recognition Service
        // Getting response for the signaling
        const faservice_response = await axios.post(url, form, { headers: form.getHeaders() });

        const answerSdp = {
            "sdp" : faservice_response.data["sdp"],
            "type" : faservice_response.data["type"]
        };

        return answerSdp;
    }
}