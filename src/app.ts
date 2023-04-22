import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan';
import { db } from './models'
// import goalRoutes from './routes/goalRoutes'
import userRoutes from './routes/userRoutes'

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3001']
};
app.use(cors(corsOptions));

// // routes
// app.use('/goals', goalRoutes);
app.use('/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

// Syncing our database
db.sync().then(() => {
    console.info("----- DATABASE CONNECTION: SUCCESSFUL -----")
});

app.listen(3000);
