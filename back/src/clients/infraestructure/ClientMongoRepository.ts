import ClienteRequest from '../domain/DTOS/ClienteRequest';
import IClient from '../domain/Cliente';
import ClienteRepository from '../domain/ClienteRepository';
import ClientModel from '../../config/model/ModelClient';
import { v4 as uuidv4 } from 'uuid';

export default class ClientMongoRepository implements ClienteRepository {
    constructor(readonly model: typeof ClientModel) {}

    async addClient(clientRequest: ClienteRequest): Promise<IClient | null> {
        try {
            const isExistedClient = await this.findClient(clientRequest.name, clientRequest.email);
            if (isExistedClient) return null;

            const client: IClient = {
                id: uuidv4(),
                name: clientRequest.name,
                email: clientRequest.email,
                phone: clientRequest.phone,
                direccion: clientRequest.direccion,
                rol: 'Cliente',
                imageUrl: clientRequest.imageUrl,
                loans: [],
            };

            const result = await this.model.create(client);
            return {
                id: result.id,
                name: result.name,
                email: result.email,
                phone: result.phone,
                direccion: result.direccion,
                rol: result.rol,
                imageUrl: result.imageUrl,
                loans: result.loans,
            };
        } catch (error) {
            console.error('Error trying to add client to database:', error);
            throw new Error('Error adding client to database. Please try again.');
        }
    }

    async getClientByPk(pk: string): Promise<IClient | null> {
        try {
            const result = await this.model.findOne({ id: pk });
            return result ? result.toObject() : null;
        } catch (error) {
            console.error('Error trying to search for client in database:', error);
            throw new Error(`Error retrieving client with id: ${pk}.`);
        }
    }

    async getClients(): Promise<IClient[] | null> {
        try {
            const result = await this.model.find();
            return result.map((client) => client.toObject());
        } catch (error) {
            console.error('Error trying to search for clients in database:', error);
            throw new Error('Error retrieving clients from database.');
        }
    }

    async findClient(name: string, email: string): Promise<IClient | null> {
        try {
            const clientFound = await this.model.findOne({ name, email });
            if (!clientFound) return null;

            return clientFound.toObject();
        } catch (error) {
            console.error('Error trying to search for client in database:', error);
            throw new Error(`Error finding client with name: ${name} and email: ${email}.`);
        }
    }

    async deleteByPk(pk: string): Promise<boolean> {
        try {
            const deletedClient = await this.model.findOneAndDelete({ id: pk });
            return deletedClient !== null;
        } catch (error) {
            console.error('Error trying to delete client from database:', error);
            throw new Error(`Error deleting client with id: ${pk}.`);
        }
    }

    async updateClient(id: string, clientRequest: ClienteRequest): Promise<IClient | null> {
        try {
            const existingClient = await this.model.findOne({ id });
            if (!existingClient) return null;

            // Verificar si el nuevo email y nombre ya existen en otro cliente
            if (
                (clientRequest.email !== existingClient.email || clientRequest.name !== existingClient.name) &&
                (await this.findClient(clientRequest.name, clientRequest.email))
            ) {
                return null; // Conflicto: el nombre y email ya están registrados
            }

            const updatedClient = await this.model.findOneAndUpdate(
                { id },
                {
                    $set: {
                        name: clientRequest.name,
                        email: clientRequest.email,
                        phone: clientRequest.phone,
                        direccion: clientRequest.direccion,
                        imageUrl: clientRequest.imageUrl,
                    },
                },
                { new: true } // Retorna el documento actualizado
            );

            if (!updatedClient) return null;

            return updatedClient.toObject();
        } catch (error) {
            console.error('Error trying to update client in database:', error);
            throw new Error(`Error updating client with id: ${id}.`);
        }
    }
}