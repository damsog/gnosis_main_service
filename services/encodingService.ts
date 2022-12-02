import axios from "axios";
import { Files } from "formidable";
import { PeerConnectionDM } from "../dataModels/PeerConnectionModel";
import SftpService from "./sftpService";
import Client from 'ssh2-sftp-client';
import formdata from 'form-data';

export class EncodingService{
    static async encode(imagePaths: string | string[], sftpClient: Client): Promise<string[]> {
        
        const sftpService = new SftpService(sftpClient);

        let faservice_response: any;

        if(typeof imagePaths === 'string'){
            // Get the image from the sftp server as a buffer
            const buffer = await sftpService.download(imagePaths, undefined);

            let form = new formdata();
            form.append('file', buffer, { filename: 'felipe1.jpg' });

            // Setting configuration of the request
            var url = `http://${process.env.FACE_ANALYTICS_SERVER}:${process.env.FACE_ANALYTICS_PORT}/encoder/image`;

            // Requesting to the Recognition Service
           faservice_response = await axios.post(url, form, { headers: form.getHeaders() });
        }else{
            // Get the images from the sftp server as a buffer
            const buffers = await Promise.all(imagePaths.map(async (imagePath) => {
                const buffer = await sftpService.download(imagePath, undefined);
                return buffer;
            }));

            let form = new formdata();
            buffers.forEach((buffer, index) => {
                form.append('file', buffer, { filename: `felipe${index}.jpg` });
            });

            // Setting configuration of the request
            var url = `http://${process.env.FACE_ANALYTICS_SERVER}:${process.env.FACE_ANALYTICS_PORT}/encoder/image`;

            // Requesting to the Recognition Service
           faservice_response = await axios.post(url, form, { headers: form.getHeaders() });
        }
        
        return faservice_response.data;
    }
}