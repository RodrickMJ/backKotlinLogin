import UserResponse from "../domain/DTOS/UserResponse";
import UserRepository from "../domain/UserRepository";

export default class GetByPkUseCase {
    constructor(readonly userRepository: UserRepository){}

    async run (pk: string): Promise<UserResponse | null>{
       const result = await this.userRepository.getUserByPk(pk);

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