import express from 'express';
import cors from 'cors';
import taskRoutes from './apiroutes.js';

const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/tasks', taskRoutes);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bem vindo!' });
});

const port = 3001;
app.listen(port, () => {
  console.log(`🚀 Servidor da API rodando em http://localhost:${port}`);
});