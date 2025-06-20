import AuthRequest from "./DTOS/AuthRequest";
import Auth from "./Auth";
import StoragePasswordResetCodeRequest from "./DTOS/StoragePasswordResetCode";

export default interface AuthRepository {
    access(auth: Omit<AuthRequest, 'name'>): Promise<Auth | null>;
    add(auth: AuthRequest):Promise<Auth | null>
    findUser(name: string, email: string): Promise<Auth | null>;
    findUserByPk(id: string): Promise<Auth | null>;
    updateBypk(id: string, auth: Omit<AuthRequest, 'password'>): Promise<Auth | null>;
    deleteByPk(pk: string): Promise<boolean>;

    //restablecimiento de contraseña
    storePasswordResetCode(request: StoragePasswordResetCodeRequest): Promise<void>;
    resetPassword(userId: string, newPassword: string): Promise<void>
    
 
}
