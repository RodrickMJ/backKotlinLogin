import UserRepository from "../domain/UserRepository";

export default class DeleteUseCase {
    constructor(readonly userRepository: UserRepository){}

    async run (pk: string): Promise<boolean>{
        return  await this.userRepository.deleteByPk(pk)
    }

}