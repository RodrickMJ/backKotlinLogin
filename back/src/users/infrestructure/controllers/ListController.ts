import ListUseCase from "../../aplication/ListUseCase";
import { Request, Response } from "express";

export default class ListController {
    constructor (readonly listUseCase: ListUseCase){}

    async run (_req: Request, res:Response){

        try {
            const result = await this.listUseCase.run();

            if (!result || result.length === 0) {
                return res.status(404).json({
                    data: null,
                    msg: 'No users found' 
                });
            }

            return res.status(200).json({
                data: result,
                msg: 'Users retrieved successfully'
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                data: null,
                msg: 'Internal server Error'
            })
        }

    }

}