import ClienteRequest from '../domain/DTOS/ClienteRequest';
import ClienteResponse from '../domain/DTOS/ClienteResponse';
import ClienteRepository from '../domain/ClienteRepository';

export default class AddUseCase {
    constructor(readonly clientRepository: ClienteRepository) { }

    async run(clientRequest: ClienteRequest): Promise<ClienteResponse | null> {
        const result = await this.clientRepository.addClient(clientRequest);
        if (!result) return null;

        // Convertimos el resultado en un ClienteResponse
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
