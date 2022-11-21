import Client from 'ssh2-sftp-client';
import logger from '../lib/logger';

const sftp = new Client();
(async () => {
    await sftp.connect({
        host: '192.168.1.1',
        port: 2222,
        username: 'admin',
        password: '1111'
    });
})();

export default sftp;