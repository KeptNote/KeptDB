import express, {Request, Response, Router} from 'express';
import SessionDatabaseService from "../service/database/session.database.service.js";


const sessionRouter: Router = express.Router();

sessionRouter.get('/create', async(req: Request, res: Response) => {
    try {
        const { userId, userAgent, ipAddress, expirationTime } = req.query;
        if(typeof userId !== "string" || typeof userAgent !== "string" || typeof ipAddress !== "string" || typeof expirationTime !== "string"){
            return res.sendStatus(400);
        }
        return res.json(await SessionDatabaseService.createSession(userId, userAgent, ipAddress, expirationTime));
    } catch(error: any){
        return res.sendStatus(500);
    }
});

sessionRouter.get('/delete', async(req: Request, res: Response) => {
    try {
        const { sessionId, userId } = req.query;
        if(typeof sessionId !== "string" || typeof userId !== "string"){
            return res.sendStatus(400);
        }
        return res.json(await SessionDatabaseService.deleteSession(sessionId, userId));
    } catch(error: any){
        return res.sendStatus(500);
    }
});


export default sessionRouter;