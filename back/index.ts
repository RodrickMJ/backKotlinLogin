import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from "./src/auth/infrestructure/Routers/authRouter"
import connectToDatabase from './src/config/DB/DataBaseConection';
import usersRouter from "./src/users/infrestructure/routers/UserRouter"
import LoadsRouter from './src/Loan/infrestruture/routers/LoanRouter';
import ClientRouter from "./src/clients/infraestructure/routers/ClientRouter"

const Port = parseInt(process.env['APP_PORT'] ?? '3001');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use("/users", usersRouter)
app.use("/clients", ClientRouter);
app.use("/loans", LoadsRouter);

app.get('/', (_req, res) =>{
    res.send('Main API')
});

connectToDatabase()
    .then(() => {
        app.listen(Port, () => {
            console.log('Server listening on port', Port);
        });
    })
    .catch((err) => {
        console.error('Error initializing server:', err);
    });


    