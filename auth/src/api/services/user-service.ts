import { uuid } from 'uuidv4';

import { Database } from '../interfaces/database';
import { Constructable, Inject } from '../../util/di';
import { RedisDatabaseAdapter } from '../../adapter/redis-database-adapter';
import { User } from '../../core/models/user';
import { UserHandler } from '../interfaces/user-handler';
import { Datastore } from '../interfaces/datastore';
import { DatastoreAdapter } from '../../adapter/datastore-adapter';

@Constructable(UserHandler)
export class UserService implements UserHandler {
    public name = 'UserService';

    @Inject(Datastore)
    private readonly datastore: DatastoreAdapter;

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
        const done = await this.database.set(User.COLLECTION, userId, user);
        // if (done) {
        //     this.userCollection.set(userId, user);
        // }
        return user;
    }

    public async getUserByCredentials(username: string, password: string): Promise<User> {
        const user = this.datastore.findUserByCredentials(username, password);
        return user;
        // const users = this.getAllUsers();
        // return users.find(user => user.username === username && user.password === password);
    }

    public async getUserBySessionId(sessionId: string): Promise<User> {
        return {} as User;
        // const users = this.getAllUsers();
        // return users.find(user => user.hasSessionId(sessionId));
    }

    public async getUserByUserId(userId: string): Promise<User | undefined> {
        const users = this.getAllUsers();
        return users.find(user => user.id === userId);
    }

    public async hasUser(username: string): Promise<boolean> {
        return this.datastore.hasUser(username);
        // const users = this.getAllUsers();
        // return !!users.find(user => user.username === username && user.password === password);
    }

    public getAllUsers(): User[] {
        return Array.from(this.userCollection.values());
    }

    private async getAllUsersFromDatabase(): Promise<User[]> {
        return await this.database.getAll(User.COLLECTION);
    }

    private initUserCollection(users: User[]): void {
        for (const user of users) {
            this.userCollection.set(user.id, user);
        }
    }

    private async mockUserData(): Promise<void> {
        await this.create('demo', 'demo')
            .then(() => console.log('success'))
            .catch(e => console.log(e));
    }
}