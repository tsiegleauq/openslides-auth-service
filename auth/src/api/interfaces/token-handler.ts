import { InjectableClass } from '../../util/di';
import { JwtValidator } from './jwt-validator';
import { Cookie, Ticket, Token } from '../../core/ticket';
import { User } from '../../core/models/user';

export abstract class TokenHandler extends InjectableClass implements JwtValidator<Token> {
    public static verifyCookie: () => Cookie;
    public static verifyToken: () => Token;
    public static decode: <T>() => T;
    public abstract create: (user: User) => Promise<Ticket>;
    public abstract refresh: (cookie: string, sessionId: string, user: User) => Promise<Ticket>;
    public abstract isValid: (token: string) => Token | undefined;
}