import AddUseCase from '../aplication/AddUseCase';
import ListUseCase from '../aplication/ListUseCase';
import GetClientByIdUseCase from '../aplication/GetClientByIdUseCase';
import DeleteUseCase from '../aplication/DeleteUseCase';
import AddController from './controllers/AddController';
import ListController from './controllers/ListController';
import GetClientByIdController from './controllers/GetClientByIdController';
import DeleteController from './controllers/DeleteController';
import ClientMongoRepository from './ClientMongoRepository';
import ClientModel from '../../config/model/ModelClient';

const clientMongoRepository = new ClientMongoRepository(ClientModel);

const addUseCase = new AddUseCase(clientMongoRepository);
const listUseCase = new ListUseCase(clientMongoRepository);
const getClientByIdUseCase = new GetClientByIdUseCase(clientMongoRepository);
const deleteUseCase = new DeleteUseCase(clientMongoRepository);


export const addController = new AddController(addUseCase);
export const listController = new ListController(listUseCase);
export const getClientByIdController = new GetClientByIdController(getClientByIdUseCase);
export const deleteController = new DeleteController(deleteUseCase);