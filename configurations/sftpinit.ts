import Client from 'ssh2-sftp-client';
import logger from '../lib/logger';

const sftp = new Client();
(async () => {
    await sftp.connect({
        host: process.env.SFTP_HOST,
        port: Number(process.env.SFTP_PORT),
        username: process.env.SFTP_USER,
        password: process.env.SFTP_PASSWORD
    });
})();

export default sftp;