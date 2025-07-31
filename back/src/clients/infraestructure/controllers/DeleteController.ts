import { Request, Response } from 'express';
import DeleteUseCase from '../../aplication/DeleteUseCase';

export default class DeleteController {
    constructor(readonly deleteUseCase: DeleteUseCase) { }

    async run(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                data: null,
                msg: 'Client ID is required for deletion.',
            });
        }

        try {
            const result = await this.deleteUseCase.run(id);
            if (!result) {
                return res.status(410).json({
                    data: null,
                    msg: 'Client has been permanently removed or not found.',
                });
            }

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                data: null,
                msg: 'Internal Server Error',
            });
        }
    }
}