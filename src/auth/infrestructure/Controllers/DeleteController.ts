import DeleteUseCase from "../../aplication/DeleteByPkUseCase";
import { Request, Response } from "express";

export default class DeleteController {
    constructor(readonly deleteUseCase: DeleteUseCase){}

    async run (req:Request, res: Response){
        const {id} = req.params

        if (!id){
            return res.status(400).json({
                data: null,
                msg: 'User ID is required for deletion.'
            });
        }

        try {

            const result = await this.deleteUseCase.run(id);
            if (!result){
                return res.status(410).json({
                    data: null,
                    msg: "User has been permanently removed."
                })
            }

            return res.status(204).send();
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({data: null, msg: 'Internal Server Error'})
        }


    }

}