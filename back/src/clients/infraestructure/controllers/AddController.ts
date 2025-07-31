import { Request, Response } from 'express';
import AddUseCase from '../../aplication/AddUseCase';
import ClienteRequest from '../../domain/DTOS/ClienteRequest';

export default class AddController {
    constructor(private readonly addUseCase: AddUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const { name, email, phone, direccion, imageUrl }: ClienteRequest = req.body;

            if (!name || !email || !phone || !direccion) {
                return res.status(400).json({
                    data: null,
                    msg: 'Name, email, phone, and address are required.',
                });
            }

            const result = await this.addUseCase.run({
                name,
                email,
                phone,
                direccion,
                imageUrl,
            });

            if (!result) {
                return res.status(409).json({
                    data: null,
                    msg: 'Client already exists',
                });
            }

            return res.status(201).json({
                data: result,
                msg: 'Client created successfully',
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