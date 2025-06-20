import AuthRepository from "../domain/AuthRepository";
import EncriptInterface from "./service/EncriptInterface";

export default class ResetPasswordUseCase {
    constructor(
        readonly authRepository: AuthRepository,
        readonly encryptService: EncriptInterface) { }

    async run(userId: string, newPassword: string): Promise<void> {
        newPassword = await this.encryptService.hash(newPassword)
        await this.authRepository.resetPassword(userId, newPassword)

    }
}