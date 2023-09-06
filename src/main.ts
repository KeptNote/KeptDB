import express, {Express, NextFunction, Request, Response} from 'express';
import userRouter from "./router/user.router.js";
import noteRouter from "./router/note.router.js";
import sessionRouter from "./router/session.router.js";


const app: Express = express();


app.use((req: Request, res: Response, next: NextFunction) => {

    if(req.query.authentication !== "secretKey"){
        return res.status(401).json( { reason:"authentication query is missing" })
    }

    next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/notes', noteRouter);
app.use('/api/v1/sessions', sessionRouter);

app.all('*', (req: Request, res: Response) => {
    return res.sendStatus(404);
});

app.listen(80)