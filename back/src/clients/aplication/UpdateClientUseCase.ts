import ClienteRequest from '../domain/DTOS/ClienteRequest';
import ClienteResponse from '../domain/DTOS/ClienteResponse';
import ClienteRepository from '../domain/ClienteRepository';
import IClient from '../domain/Cliente';

export default class UpdateClientUseCase {
    constructor(readonly clientRepository: ClienteRepository) { }

    async run(id: string, clientRequest: ClienteRequest): Promise<ClienteResponse | null> {
        const client = await this.clientRepository.getClientByPk(id);

        if (!client) return null;

        const updatedClient: IClient = {
            ...client,
            name: clientRequest.name || client.name,
            email: clientRequest.email || client.email,
            phone: clientRequest.phone || client.phone,
            direccion: clientRequest.direccion || client.direccion,
            imageUrl: clientRequest.imageUrl || client.imageUrl,
            loans: client.loans,
        };

        const result = await this.clientRepository.addClient(updatedClient); // Reutilizamos addClient para actualizar

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