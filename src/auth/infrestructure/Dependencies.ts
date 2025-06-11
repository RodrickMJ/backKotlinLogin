import AccessUseCase from "../aplication/AccessUseCase";
import UserMongoRepository from "./UserMongoRepository";
import AccessController from "./Controllers/AccessControllers";
import TokenService from "./Helpers/TokenService";
import EncriptService from "./Helpers/EncriptService";
import UserModel from "../../config/model/ModelUser";
import FindUserForPasswordResetController from "./Controllers/FindUserForPasswordResetControllers";
import FindUserForPasswordResetUseCase from "../aplication/FindUserForPasswordResetUseCase";
import EmailService from "./Helpers/EmailService";
import VerificationCodeService from "./Helpers/VerificationCodeService";
import AddUseCase from "../aplication/AddUseCase";
import AddController from "./Controllers/AddController";
import VerifyCodeUseCase from "../aplication/VeryCodeUseCase";
import VerifyCodeController from "./Controllers/VerifyCodeController";
import AuthMiddleware from "./middleware/Auth";
import ResetPasswordController from "./Controllers/ResetPasswordController";
import ResetPasswordUseCase from "../aplication/ResetPasswordUseCase";
import FindUserByPkController from "./Controllers/FindUserByPkController";
import FindUserByPkUseCase from "../aplication/FindUserByPkUseCase";
import UpdateByPkController from "./Controllers/UpdateByPkController";
import UpdateByPkUseCase from "../aplication/UpdateByPkUseCase";
import DeleteUseCase from "../aplication/DeleteByPkUseCase";
import DeleteController from "./Controllers/DeleteController";

const userMongoRepository = new UserMongoRepository(UserModel);
const encryptService = new EncriptService()
const tokenService = new TokenService()
const emailService = new EmailService();
const verifyCodeService = new VerificationCodeService();

const deleteUseCase = new DeleteUseCase(userMongoRepository);
const updateBypkUseCase = new UpdateByPkUseCase(userMongoRepository);
const findUserByPkUseCase = new FindUserByPkUseCase( userMongoRepository)
const accessUseCase = new AccessUseCase( tokenService, encryptService, userMongoRepository);
const addUseCase = new AddUseCase(encryptService, tokenService, userMongoRepository)
const verifyCodeUseCase = new VerifyCodeUseCase(userMongoRepository, encryptService, tokenService);
const resetPasswordUseCase = new ResetPasswordUseCase(userMongoRepository, encryptService);
const findUserForPasswordResetUseCase = new FindUserForPasswordResetUseCase(
    verifyCodeService,
    encryptService,
    emailService,
    tokenService,
    userMongoRepository
);

export const authMiddleware = new AuthMiddleware(tokenService);

export const deleteController = new DeleteController(deleteUseCase);
export const updateByPkController = new UpdateByPkController(updateBypkUseCase)
export const findUserByPkController = new FindUserByPkController(findUserByPkUseCase);
export const accessController = new AccessController(accessUseCase);
export const addController = new AddController(addUseCase);
export const verifyCodeController = new VerifyCodeController(verifyCodeUseCase, tokenService);
export const resetPasswordController = new ResetPasswordController(resetPasswordUseCase, tokenService);
export const findUserForPasswordResetController = new FindUserForPasswordResetController(
    findUserForPasswordResetUseCase
);