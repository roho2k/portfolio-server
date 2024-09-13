import express from 'express';
import cors from 'cors';
import blogRoutes from './routes/blogRoutes';
import corsOptions from './config/corsOptions';

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.options('*', cors(corsOptions));

app.use('/api', blogRoutes);

export default app;
