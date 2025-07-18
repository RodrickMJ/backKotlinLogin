import { Request, Response, NextFunction } from "express";
import DecodeToken from "../services/TokenService";
import GetByPkUseCase from "../../aplication/getByPkUseCase";
import { Types } from "mongoose";
export default class AuthMiddleware {
    constructor(
        readonly tokenService: DecodeToken,
        readonly getByPk: GetByPkUseCase
    ) {}

    async run(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)){
            return this.errorResponse(res, 'Invalid user ID format.', 400)
        } 
        if (!token) return this.errorResponse(res, "No token provided", 401);

        if (!this.tokenService.validateToken(token.replace('Bearer ', ""))) {
            return this.errorResponse(res, "Invalid token", 401);
        }

        if (!await this.isAdmin(id)) {
            return this.errorResponse(res, 'Access denied. Admins only.', 403);
        }

        next();
    }

    private async isAdmin(id: string): Promise<boolean> {
        const result = await this.getByPk.run(id);
        return  result?.rol === 'Administrador'; 
    }

    private errorResponse(res: Response, msg: string, status: number) {
        return res.status(status).json({ msg, data: null });
    }
    
}
