import TokenInterface from "../../aplication/service/TokenInterface";
import jwt from "jsonwebtoken"
import 'dotenv/config'

export default class TokenService implements TokenInterface {

    validateToken(token: string): boolean {
        
        const SECRET = process.env["JWT_SECRET"] ?? "DEFAULT_SECRET";
        try {
            const decode = jwt.verify(token, SECRET);

            if (typeof decode === 'string') return false
            return true

        } catch (error) {
            console.error(error)
            return false
        }
    }
}