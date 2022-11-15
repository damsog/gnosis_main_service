import bcrypt from 'bcryptjs';
import logger from './logger';


export class Encryptor {

    static encryptPassword = async (password:string) => {
        logger.debug( "Encrypting Password: Password Received. Encrypting" );
        const salt = await bcrypt.genSalt(10);

        logger.debug( "Encrypting Password: Salt generated" );
        const hashedPassword = await bcrypt.hash(password, salt);

        logger.debug( "Encrypting Password: Password hashed. returning" );
        return hashedPassword;
    }

    static matchPassword = async (password: string, savedPassword: string) => {
        try{
            logger.debug( "Matching Password: Received. Trying to compare" );
            const result = await bcrypt.compare(password, savedPassword);

            logger.debug( "Matching Password: Compared successful. result: "+ result  );
            return result;
        }catch(e) {
            logger.error( e );
            return 0;
        }
    }
}