import {PrismaClient} from '@prisma/client';


type SessionTable = {
    id: string;
    createdAt: Date;
    userAgent: string;
    ipAddress: string;
    expirationTime: string;
    isActive: boolean;
    isExpired: boolean;
    isBlocked: boolean;
    usersId: string;
}

export default class SessionDatabaseService {

    private static prisma: PrismaClient = new PrismaClient();


    private static dateNow(): string {
        const now = new Date();
        return new Intl.DateTimeFormat('en-US', {
            year: "numeric",
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        }).format(now);
    }

    public static async createSession(userId: string, userAgent: string, ipAddress: string, expirationTime: string): Promise<SessionTable> {
        return this.prisma.sessions.create({
            data: {
                usersId: userId,
                userAgent: userAgent,
                ipAddress: ipAddress,
                expirationTime: this.dateNow(),
                isActive: true,
                isExpired: false,
                isBlocked: false
            }
        });
    }

    public static async deleteSession(sessionId: string, userId: string){
        return this.prisma.sessions.delete({
            where: {
                id: sessionId,
                usersId: userId
            }
        })
    }

}