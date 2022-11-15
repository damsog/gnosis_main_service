import chalk from 'chalk';
const colorText = (message:String) => {
    if( process.env.NODE_ENV === 'development') {
        return chalk.cyan(message);
    }else {
        return message;
    }
}

export default colorText;