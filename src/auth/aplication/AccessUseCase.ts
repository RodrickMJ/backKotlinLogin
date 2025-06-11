import AuthRepository from "../domain/AuthRepository";
import AuthRequest from "../domain/DTOS/AuthRequest";
import AuthResponse from "../domain/DTOS/AuthResponse";
import EncriptInterface from "./service/EncriptInterface";
import TokenInterface from "./service/TokenInterface";

export default class AccessUseCase {
    constructor(
        readonly tokenService: TokenInterface,
        readonly encriptService: EncriptInterface,
        readonly authRepository: AuthRepository
    ) { }

    async run(auth: AuthRequest): Promise<AuthResponse | null> {
        const authFounded = await this.authRepository.access(auth);
        if (!authFounded) return null;

        const isPasswordValid = await this.encriptService.compare(authFounded.password, auth.password)

        if (!isPasswordValid) return null

        const response: AuthResponse = {
            id: authFounded.id.toString(),
            name: authFounded.name,
            email: authFounded.email,
            rol: authFounded.rol,
            token: this.tokenService.generateToken(authFounded.id)
        }

        return response;

    }
}