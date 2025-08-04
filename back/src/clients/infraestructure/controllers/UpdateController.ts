import { Request, Response } from 'express';
import UpdateClientUseCase from '../../aplication/UpdateClientUseCase';
import ClienteRequest from '../../domain/DTOS/ClienteRequest';

export default class UpdateController {
    constructor(readonly updateClientUseCase: UpdateClientUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, phone, direccion, imageUrl }: ClienteRequest = req.body;

            if (!id) {
                return res.status(400).json({
                    data: null,
                    msg: 'Client ID is required.',
                });
            }

            if (!name || !email || !phone || !direccion) {
                return res.status(400).json({
                    data: null,
                    msg: 'Name, email, phone, and address are required.',
                });
            }

            const result = await this.updateClientUseCase.run(id, {
                name,
                email,
                phone,
                direccion,
                imageUrl,
            });

            if (!result) {
                return res.status(404).json({
                    data: null,
                    msg: 'Client not found or email/name already in use.',
                });
            }

            return res.status(200).json({
                data: result,
                msg: 'Client updated successfully',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error',
            });
        }
    }
}