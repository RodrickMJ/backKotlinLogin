import FindUserByPkUseCase from "../../aplication/FindUserByPkUseCase";
import { Request, Response } from "express";

export default class FindUserByPkController {
    constructor (readonly findUserByPkUseCase: FindUserByPkUseCase) {}

    async run (req: Request, res:Response){
        const {id} = req.params;
        console.log(id);
        if (!id){
            return res.status(400).json({
                data: null,
                msg: 'User ID is required for this action.'
            });
        }

        try {
            const result = await this.findUserByPkUseCase.run(id);

            if(!result || result === null){
                return res.status(404).json({
                    data: null,
                    msg: `This user don't exist in the database`
                });
            }

            return res.status(200).json({
                data: result,
                msg: 'User retrived successfully'
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                data: null,
                msg: 'internal server error'
            });
        }
    }
}