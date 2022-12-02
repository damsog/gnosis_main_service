import axios from "axios";
import SftpService from "./sftpService";
import Client from 'ssh2-sftp-client';
import formdata from 'form-data';
import path from "path";

export class EncodingService{
    static async encode(imagePaths: string[],key: string, sftpClient: Client): Promise<any> {
        
        const sftpService = new SftpService(sftpClient);

        let faservice_response: any;

        // In case only one image is sent we need to call the single image endpoint
        if(imagePaths.length === 1){
            // Get the image from the sftp server as a buffer
            const buffer = await sftpService.download(imagePaths[0], undefined);

            let form = new formdata();
            form.append('file', buffer, { filename: path.basename(imagePaths[0]) });

            // single image endpoint
            var url = `http://${process.env.FACE_ANALYTICS_SERVER}:${process.env.FACE_ANALYTICS_PORT}/encoder/image`;

            // Requesting to the Recognition Service
           faservice_response = await axios.post(url, form, { headers: form.getHeaders() });

        // In case more than one image is sent we need to call the batch endpoint
        }else{
            // Get the images from the sftp server as a buffer, with their filenames.
            const imageBuffersData = await Promise.all(imagePaths.map(async (imagePath) => {
                const imageBuffer = await sftpService.download(imagePath, undefined);
                const imageName = path.basename(imagePath);
                return {
                    buffer: imageBuffer,
                    name: imageName
                }
            }));

            let form = new formdata();

            // Add the images to the form
            for(const imageBuffer of imageBuffersData){
                form.append('files', imageBuffer.buffer, { filename: imageBuffer.name });
            }
            
            // The name key
            form.append('key', key);
            
            // batch endpoint
            var url = `http://${process.env.FACE_ANALYTICS_SERVER}:${process.env.FACE_ANALYTICS_PORT}/encoder/images`;

            // Requesting to the Recognition Service
           faservice_response = await axios.post(url, form, { headers: form.getHeaders() });
        }
        
        return faservice_response.data;
    }
}