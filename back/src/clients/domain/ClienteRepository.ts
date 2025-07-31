import IClient from './Cliente';
import ClienteRequest from './DTOS/ClienteRequest';

export default interface ClienteRepository {
    addClient(clientRequest: ClienteRequest): Promise<IClient | null>;
    getClientByPk(pk: string): Promise<IClient | null>;
    getClients(): Promise<IClient[] | null>;
    deleteByPk(pk: string): Promise<boolean>;
}