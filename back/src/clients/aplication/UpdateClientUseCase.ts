import ClienteRequest from '../domain/DTOS/ClienteRequest';
import ClienteResponse from '../domain/DTOS/ClienteResponse';
import ClienteRepository from '../domain/ClienteRepository';
import IClient from '../domain/Cliente';

export default class UpdateClientUseCase {
    constructor(readonly clientRepository: ClienteRepository) {}

    async run(id: string, clientRequest: ClienteRequest): Promise<ClienteResponse | null> {
        const result = await this.clientRepository.updateClient(id, clientRequest);

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