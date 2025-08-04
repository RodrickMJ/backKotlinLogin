import ClienteRequest from './DTOS/ClienteRequest';
import IClient from './Cliente';

export default interface ClienteRepository {
    addClient(clientRequest: ClienteRequest): Promise<IClient | null>;
    getClientByPk(pk: string): Promise<IClient | null>;
    getClients(): Promise<IClient[] | null>;
    deleteByPk(pk: string): Promise<boolean>;
    updateClient(id: string, clientRequest: ClienteRequest): Promise<IClient | null>; // Nuevo método
}