import ClienteRepository from '../domain/ClienteRepository';

export default class DeleteUseCase {
    constructor(readonly clientRepository: ClienteRepository) { }

    async run(pk: string): Promise<boolean> {
        return await this.clientRepository.deleteByPk(pk);
    }
}