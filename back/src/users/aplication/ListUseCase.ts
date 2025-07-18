
import UserResponse from "../domain/DTOS/UserResponse";
import UserRepository from "../domain/UserRepository";

export default class ListUseCase {
    constructor( readonly userRepository: UserRepository){}

    async run (): Promise<UserResponse[] | null> {
        const result = await this.userRepository.getUsers();

        if (!result) return null

        const response: Array<UserResponse> = [];

        result.map((user)=> {
            response.push({
                id: user.id,
                name: user.name,
                email: user.email,
                rol: user.rol
            })
        });

        return response

    }

}