import { uuid } from 'uuidv4';

import RedisDatabaseAdapter from '../../../adapter/services/database-adapter';
import { Database } from '../../../adapter/interfaces/database-port';
import { Constructable, Inject } from '../../modules/decorators';
import { User } from './user';
import { UserServiceInterface } from './user-service.interface';

@Constructable(UserServiceInterface)
export class UserService implements UserServiceInterface {
    public name = 'UserService';

    @Inject(Database, User)
    private readonly database: RedisDatabaseAdapter;

    private readonly userCollection: Map<string, User> = new Map();

    public constructor() {
        this.mockUserData();
        this.getAllUsersFromDatabase()
            .then(users => this.initUserCollection(users))
            .catch(e => console.log(e));
    }

    public async create(username: string, password: string): Promise<User> {
        const userId = uuid();
        const user: User = new User({ username, password, userId });
        const done = await this.database.set(User.COLLECTIONSTRING, userId, user);
        if (done) {
            this.userCollection.set(userId, user);
        }
        return user;
    }

    public async getUserByCredentials(username: string, password: string): Promise<User | undefined> {
        const users = this.getAllUsers();
        return users.find(user => user.username === username && user.password === password);
    }

    public async getUserBySessionId(sessionId: string): Promise<User | undefined> {
        const users = this.getAllUsers();
        return users.find(user => user.sessionId === sessionId);
    }

    public async getUserByUserId(userId: string): Promise<User | undefined> {
        const users = this.getAllUsers();
        return users.find(user => user.userId === userId);
    }

    public async hasUser(username: string, password: string): Promise<boolean> {
        const users = this.getAllUsers();
        return !!users.find(user => user.username === username && user.password === password);
    }

    public getAllUsers(): User[] {
        return Array.from(this.userCollection.values());
    }

    private async getAllUsersFromDatabase(): Promise<User[]> {
        return await this.database.getAll(User.COLLECTIONSTRING);
    }

    private initUserCollection(users: User[]): void {
        for (const user of users) {
            this.userCollection.set(user.userId, user);
        }
    }

    private async mockUserData(): Promise<void> {
        await this.create('demo', 'demo')
            .then(() => console.log('success'))
            .catch(e => console.log(e));
    }
}