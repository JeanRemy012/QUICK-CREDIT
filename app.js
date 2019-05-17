import express from 'express';
import userRouter from './Server/routes/user';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/auth', userRouter);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})