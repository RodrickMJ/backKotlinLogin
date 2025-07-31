import AddLoanUseCase from '../aplication/AddLoanUseCase';
import DeleteLoanUseCase from '../aplication/DeleteLoanUseCase';
import GetLoanByIdUseCase from '../aplication/GetLoanByIdUseCase';
import ListLoansByClientUseCase from '../aplication/ListLoansByClientUseCase';
import AddPaymentUseCase from '../aplication/AddPaymentUseCase';
import AddLoanController from './controllers/AddLoanController';
import DeleteLoanController from './controllers/DeleteLoanController';
import GetLoanByIdController from './controllers/GetLoanByIdController';
import ListLoansByClientController from './controllers/ListLoansByClientController';
import AddPaymentController from './controllers/AddPaymentController';
import LoanMongoRepository from './LoanMongoRepository';
import ClientModel from '../../config/model/ModelClient';


const loanMongoRepository = new LoanMongoRepository(ClientModel);

// Casos de uso de préstamos
const addLoanUseCase = new AddLoanUseCase(loanMongoRepository);
const deleteLoanUseCase = new DeleteLoanUseCase(loanMongoRepository);
const getLoanByIdUseCase = new GetLoanByIdUseCase(loanMongoRepository);
const listLoansByClientUseCase = new ListLoansByClientUseCase(loanMongoRepository);
const addPaymentUseCase = new AddPaymentUseCase(loanMongoRepository);

// Controladores de préstamos
export const addLoanController = new AddLoanController(addLoanUseCase);
export const deleteLoanController = new DeleteLoanController(deleteLoanUseCase);
export const getLoanByIdController = new GetLoanByIdController(getLoanByIdUseCase);
export const listLoansByClientController = new ListLoansByClientController(listLoansByClientUseCase);
export const addPaymentController = new AddPaymentController(addPaymentUseCase);