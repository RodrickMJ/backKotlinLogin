import UserRequest from "../domain/DTOS/UserRequest";
import UserResponse from "../domain/DTOS/UserResponse";
import UserRepository from "../domain/UserRepository";
import EncriptInterface from "./service/EncryptInterface";

export default class AddUseCase {
    constructor(
        readonly encryptService: EncriptInterface,
        readonly userRepository: UserRepository
    ){}

    async run (userRequest: UserRequest): Promise <UserResponse | null> {
        userRequest.password= await this.encryptService.hash(userRequest.password);
        const result = await this.userRepository.addUser(userRequest);

        if (!result) return null

        const response: UserResponse = {
            id: result.id,
            name: result.name,
            email: result.email,
            rol: result.rol
        }

        return response
    }

}