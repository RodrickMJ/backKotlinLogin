import AddUseCase from "../aplication/AddUseCase";
import ListUseCase from "../aplication/ListUseCase";
import GetByPkUseCase from "../aplication/getByPkUseCase";
import AddController from "./controllers/AddController";
import ListController from "./controllers/ListController";
import TokenService from "./services/TokenService";
import UserModel from "../../config/model/ModelUser";
import UserMongoRepository from "./UserMongoRepository";
import EncryptService from "./services/EncryptService";
import FieldValidatorUtils from "./utils/FieldValidatorUtils";
import FieldValidator from "./middlewares/verifyFields";
import AuthMiddleware from "./middlewares/Auth";
import DeleteUseCase from "../aplication/DeleteUseCase";
import DeleteController from "./controllers/DeleteContoller";


const userMongoRepository = new UserMongoRepository(UserModel);
const encryptService = new EncryptService();
const fieldValidator= new FieldValidatorUtils();
const tokenService = new TokenService();

const addUseCase = new AddUseCase(encryptService, userMongoRepository);
const listUseCase = new ListUseCase(userMongoRepository);
const getByPkUseCase = new GetByPkUseCase(userMongoRepository);
const deleteUseCase = new DeleteUseCase(userMongoRepository);


//middlewares
export const fieldValidatorMiddleware = new FieldValidator(fieldValidator);
export const autMiddleware = new AuthMiddleware(tokenService, getByPkUseCase);

//controllers
export const addController = new AddController(addUseCase);
export const listController = new ListController(listUseCase);
export const deleteController = new DeleteController(deleteUseCase);

