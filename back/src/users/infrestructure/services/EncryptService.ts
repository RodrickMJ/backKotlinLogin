import EncriptInterface from "../../aplication/service/EncryptInterface";
import bcrypt from "bcrypt"

export default class EncryptService implements EncriptInterface {
    hash(password: string): string {
        return bcrypt.hashSync(
            password,
            parseInt(process.env['SALT_ROUNDS'] ?? '5'))
    }
} 