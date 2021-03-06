import { Ticket, Token } from '../../core/ticket';
import { Validation } from './validation';

export abstract class AuthHandler {
    public abstract login(username: string, password: string): Promise<Validation<Ticket>>;
    public abstract whoAmI(cookieAsString: string): Promise<Validation<Ticket>>;
    public abstract logout(token: Token): void;
    public abstract getListOfSessions(): string[];
    public abstract clearUserSessionByUserId(userId: string): void;
    public abstract clearAllSessionsExceptThemselves(userId: string): void;
    public abstract toHash(toHash: string): string;
}
