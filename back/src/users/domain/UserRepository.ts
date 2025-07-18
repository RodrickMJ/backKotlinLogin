import IUser from "./User";
import UserRequest from "./DTOS/UserRequest";

export default interface UserRepository {
    addUser(userReques: UserRequest):Promise<IUser | null>
    getUserByPk(pk: string):Promise<IUser | null>
    getUsers():Promise<IUser[] | null>
    deleteByPk(pk: string): Promise<boolean>;
}