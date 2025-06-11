import VerificationCodeInterface from "../../aplication/service/VerificationCodeInterface";
import speakeasy from "speakeasy"



const lengthSecreteCode = parseInt(process.env['LENGTH_SECRETE_CODE'] || '')

export default class VerificationCodeService implements VerificationCodeInterface {
    private secret: string; 

    constructor(){
        this.secret = speakeasy.generateSecret({length: lengthSecreteCode}).base32
    }

    generateVerificationCode(): string {

        const generateCode = speakeasy.totp({
            secret: this.secret,
            encoding: 'base32'
        });

        return generateCode
    }

}