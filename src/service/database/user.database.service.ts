import { PrismaClient } from '@prisma/client'
import PasswordValidator from 'password-validator';

export type UserTable =  { id: string; username: string; password: string; createdAt: Date; } | null

export default class UserDatabaseService {
    
    private static passwordSchema  = new PasswordValidator().is().min(8).max(100).has().uppercase().lowercase().has().digits(2);
    private static prisma: PrismaClient = new PrismaClient();

    private static validateUser(username: string): boolean{
        return username.length >= 8;
    }

    private static validatePassword(password: string): boolean | any[] {
        return this.passwordSchema.validate(password);
    }

    public static async createUser(username: string, password: string): Promise<UserTable> {
        if(!this.validateUser(username) || !this.validatePassword(password)){ return null; }
        return this.prisma.users.create({
            data: {
                username: username,
                password: password
            }
        })
    }

    public static async getUserByUserId(id: string): Promise<UserTable> {
        return this.prisma.users.findUnique({
            where: {
                id: id
            }
        })
    }

    public static async getUserByUsername(username: string): Promise<UserTable> {
        return this.prisma.users.findUnique({
            where: {
                username: username
            }
        })
    }
}