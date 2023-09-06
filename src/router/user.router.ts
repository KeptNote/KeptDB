import express, {Request, Response, Router} from 'express';
import UserDatabaseService, {UserTable} from "../service/database/user.database.service.js";


const userRouter: Router = express.Router();

userRouter.get(['/by-id/:id', '/by-username/:username'], async(req: Request, res: Response) => {
    try {
        if(req.params.id){
            const user: UserTable = await UserDatabaseService.getUserByUserId(req.params.id);
            return res.json(user);
        }

        if(req.params.username){
            const user: UserTable = await UserDatabaseService.getUserByUsername(req.params.username);
            return res.json(user);
        }

        return res.sendStatus(400);
    } catch(error: any){
        return res.status(400).json({ reason: "userId missing" });
    }
});

userRouter.get('/all', async(req: Request, res: Response) => {
    return res.json(await UserDatabaseService.getAllUsers());
})

userRouter.get('/create', async(req: Request, res: Response) => {

    if(typeof req.query.username !== "string" || typeof req.query.password !== "string"){
        return res.sendStatus(400);
    }

    try {
        return res.json(await UserDatabaseService.createUser(req.query.username, req.query.password));
    } catch(error: any){
        return res.sendStatus(500);
    }
});


export default userRouter;