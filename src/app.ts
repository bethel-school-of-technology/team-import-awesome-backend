import express from 'express'
import morgan from 'morgan';
import { conn } from './db.js';
import goalRoutes from './routes/goalRoutes'
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

// routes
app.use('/goals', goalRoutes);
app.use('/users', userRoutes);

app.listen(3000);

async function showTables() {
    const results = await conn.execute('SHOW TABLES')
    console.log(results)
}
showTables()