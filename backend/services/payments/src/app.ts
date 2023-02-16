import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(cors({
    origin: "*",
    methods: ['GET', "POST", 'PUT', "DELETE", 'PATCH']
}))

// app.use('/api/auth', authRouter);

export {app};