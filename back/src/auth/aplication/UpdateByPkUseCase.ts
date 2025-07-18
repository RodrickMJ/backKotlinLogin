// auth/aplication/UpdateByPkUseCase.ts
import AuthRepository from "../domain/AuthRepository";
import AuthRequest from "../domain/DTOS/AuthRequest";
import AuthResponse from "../domain/DTOS/AuthResponse";

export default class UpdateByPkUseCase {
    constructor(readonly authRepository: AuthRepository){}

    async run (id: string, authRequest: AuthRequest): Promise<AuthResponse | null> {
        const { password, ...safeUpdateData } = authRequest;
        const result = await this.authRepository.updateBypk(id, safeUpdateData);

        if (!result) return null

        const response: AuthResponse = {
            id: result.id,
            imageUrl: result.imageUrl,
            name: result.name,
            email: result.email,
            phone: result.phone,
            description: result.description,
            rol: result.rol
        }

        return response;
    }
}