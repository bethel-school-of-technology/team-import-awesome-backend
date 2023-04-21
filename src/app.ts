import express from 'express'
import morgan from 'morgan';
import { conn } from './db.js';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:3001']
};
app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.json({msg: 'Hello world!'})
})

app.listen(3000);

async function showTables() {
    const results = await conn.execute('SHOW TABLES')
    console.log(results)
}
showTables()

