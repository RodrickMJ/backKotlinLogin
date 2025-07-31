import ClienteResponse from '../domain/DTOS/ClienteResponse';
import ClienteRepository from '../domain/ClienteRepository';

export default class GetClientByIdUseCase {
    constructor(readonly clientRepository: ClienteRepository) { }

    async run(pk: string): Promise<ClienteResponse | null> {
        const result = await this.clientRepository.getClientByPk(pk);

        if (!result) return null;

        const response: ClienteResponse = {
            id: result.id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            direccion: result.direccion,
            rol: result.rol,
            imageUrl: result.imageUrl,
            loans: result.loans,
        };

        return response;
    }
}