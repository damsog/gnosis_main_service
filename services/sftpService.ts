class SftpService {
    sftpClient: any;
    constructor(sftpClient: any) {
        this.sftpClient = sftpClient;
    }


    async list(path: string) {
      const list = await this.sftpClient.list(path);
      return list;
    }

    async upload(localPath: string, remotePath: string) {
        const upload = await this.sftpClient.put(localPath, remotePath);
        return upload;
    }

    async rename(remotePath: string, newName: string) {
        const rename = await this.sftpClient.rename(remotePath, newName);
        return rename;
    }

    async mkdir(remotePath: string) {
        const dir = await this.sftpClient.mkdir(remotePath);
        return dir;
    }

    async mkdirIfNotExist(remotePath: string) {
        const dir = await this.sftpClient.mkdir(remotePath, true);
        return dir;
    }

    async download(remotePath: string, localPath: string) {
        const download = await this.sftpClient.get(remotePath, localPath);
        return download;
    }

    async delete(remotePath: string) {
        const deleteFile = await this.sftpClient.delete(remotePath);
        return deleteFile;
    }
}

export default SftpService;