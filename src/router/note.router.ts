import express, {Request, Response, Router} from 'express';
import NoteDatabaseService, {NoteTable} from "../service/database/note.database.service.js";

const noteRouter: Router = express.Router();

noteRouter.get('/create', async(req: Request, res: Response) => {
    try {

        if(typeof req.query.userId !== "string" || typeof req.query.title !== "string" || typeof req.query.content !== "string"){
            return res.sendStatus(400);
        }

        const note: NoteTable = await NoteDatabaseService.createNote(req.query.userId, req.query.title, req.query.content);
        return res.json(note);
    } catch(error: any){
        return res.sendStatus(500);
    }
});

noteRouter.get('/by-id/:id', async(req: Request, res: Response) => {
    return res.json(await NoteDatabaseService.getNoteById(req.params.id));
});

noteRouter.get('/by-username/:username', async(req: Request, res: Response) => {
    return res.json(await NoteDatabaseService.getNotesOfUser(req.params.username, 0));
})

noteRouter.get('/delete', async(req: Request, res: Response) => {
    try {

        if(typeof req.query.userId !== "string" || typeof req.query.noteId !== "string"){
            return res.sendStatus(400);
        }

        return res.json(await NoteDatabaseService.deleteNote(req.query.userId, req.query.noteId));
    } catch(error: any){
        return res.sendStatus(500);
    }
});

noteRouter.get('/delete-all', async(req: Request, res: Response) => {
    try {

        if(typeof req.query.userId !== "string"){
            return res.sendStatus(400);
        }

        return res.json(await NoteDatabaseService.deleteAllUserNotes(req.query.userId));
    } catch(error: any){
        return res.sendStatus(500);
    }
});

export default noteRouter;