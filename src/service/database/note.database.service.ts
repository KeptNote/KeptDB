import { PrismaClient } from '@prisma/client'
import UserDatabaseService, {UserTable} from "./user.database.service.js";

type NoteTable =  { id: string; createdAt: Date; title: string; content: string; usersId: string; } | null


export default class NoteDatabaseService {

    private static prisma: PrismaClient = new PrismaClient();

    public static async createNote(userId: string, noteTitle: string, noteContent: string): Promise<NoteTable> {
        const user: UserTable = await UserDatabaseService.getUserByUserId(userId);
        if(user == null){ return null; }
        return this.prisma.notes.create({
            data: {
                title: noteTitle,
                content: noteContent,
                usersId: userId
            }
        })
    }

    public static async getNoteById(noteId: string): Promise<NoteTable> {
        return this.prisma.notes.findUnique({
            where: {
                id: noteId
            }
        })
    }

    public static async getNotesOfUser(userId: string, limit: number, startAt: number = 0): Promise<NoteTable[]> {
        return this.prisma.notes.findMany({
            skip: startAt,
            take: limit,
            where: {
                usersId: userId
            }
        })
    }

    public static async deleteNote(userId: string, noteId: string): Promise<NoteTable> {
        return this.prisma.notes.delete({
            where: {
                id: noteId,
                usersId: userId
            }
        })
    }

    public static async deleteAllUserNotes(userId: string) {
        return this.prisma.notes.deleteMany({
            where: {
                usersId: userId
            }
        })
    }
}