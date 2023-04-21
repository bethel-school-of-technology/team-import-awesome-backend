var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import morgan from 'morgan';
import { conn } from './db.js';
import cors from "cors";
import goalRoutes from './routes/goalRoutes';
import userRoutes from './routes/userRoutes';
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: ['http://localhost:3001']
};
app.use(cors(corsOptions));
// routes
app.use('/goals', goalRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => {
    res.json({ msg: 'Hello world!' });
});
app.listen(3000);
function showTables() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield conn.execute('SHOW TABLES');
        console.log(results);
    });
}
showTables();
