import ClienteResponse from '../domain/DTOS/ClienteResponse';
import ClienteRepository from '../domain/ClienteRepository';

export default class ListUseCase {
    constructor(readonly clientRepository: ClienteRepository) { }

    async run(): Promise<ClienteResponse[] | null> {
        const result = await this.clientRepository.getClients();

        if (!result) return null;

        const response: ClienteResponse[] = result.map((client) => ({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            direccion: client.direccion,
            rol: client.rol,
            imageUrl: client.imageUrl,
            loans: client.loans,
        }));

        return response;
    }
}