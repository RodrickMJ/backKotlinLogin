import AuthRepository from "../domain/AuthRepository"

export default class DeleteUseCase {
    constructor(readonly authRepository: AuthRepository){}

    async run (pk: string): Promise<boolean>{
        return  await this.authRepository.deleteByPk(pk)
    }

}