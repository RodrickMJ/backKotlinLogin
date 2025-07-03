import AuthRepository from "../domain/AuthRepository";
import AuthRequest from "../domain/DTOS/AuthRequest";
import AuthResponse from "../domain/DTOS/AuthResponse";
import TokenService from "../infrestructure/Helpers/TokenService";

export default class FindUserByPkUseCase {
    constructor(
        readonly authRepository: AuthRepository,
        // readonly tokenService: TokenService
    ) {}

    async run (pk: string): Promise<AuthResponse | null> {
    const user = await this.authRepository.findUserByPk(pk);
    
    if (!user) return null;

    return {
        id: user.id,
        imageUrl: user.imageUrl,
        name: user.name,
        email: user.email,
        rol: user.rol,
        // token: this.tokenService.generateToken(user.id)
    };
}

}   