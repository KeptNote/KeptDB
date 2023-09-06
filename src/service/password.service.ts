import bcrypt from 'bcrypt';

export default class PasswordService {

    private static saltRounds: number = 10;

    static async hash(password: string): Promise<string> {
        const hashedPassword: string = await bcrypt.hash(password, this.saltRounds);
        return Buffer.from(hashedPassword).toString('base64');
    }

    static async verify(password: string, base64HashedPassword: string): Promise<boolean> {
        const hashedPassword = Buffer.from(base64HashedPassword, 'base64').toString('utf-8');
        return await bcrypt.compare(password, hashedPassword);
    }
}
