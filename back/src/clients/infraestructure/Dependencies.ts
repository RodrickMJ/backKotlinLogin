import AddUseCase from '../aplication/AddUseCase';
import ListUseCase from '../aplication/ListUseCase';
import GetClientByIdUseCase from '../aplication/GetClientByIdUseCase';
import DeleteUseCase from '../aplication/DeleteUseCase';
import UpdateClientUseCase from '../aplication/UpdateClientUseCase';
import AddController from './controllers/AddController';
import ListController from './controllers/ListController';
import GetClientByIdController from './controllers/GetClientByIdController';
import DeleteController from './controllers/DeleteController';
import UpdateController from './controllers/UpdateController';
import ClientMongoRepository from './ClientMongoRepository';
import ClientModel from '../../config/model/ModelClient';

const clientMongoRepository = new ClientMongoRepository(ClientModel);

const addUseCase = new AddUseCase(clientMongoRepository);
const listUseCase = new ListUseCase(clientMongoRepository);
const getClientByIdUseCase = new GetClientByIdUseCase(clientMongoRepository);
const deleteUseCase = new DeleteUseCase(clientMongoRepository);
const updateClientUseCase = new UpdateClientUseCase(clientMongoRepository);

export const addController = new AddController(addUseCase);
export const listController = new ListController(listUseCase);
export const getClientByIdController = new GetClientByIdController(getClientByIdUseCase);
export const deleteController = new DeleteController(deleteUseCase);
export const updateController = new UpdateController(updateClientUseCase);