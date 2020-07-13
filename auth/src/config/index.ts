import fs from 'fs';

export namespace Config {
    export const DATABASE_PATH = 'database/';
    export const DATASTORE_READER = `${process.env.INSTANCE_DOMAIN || `http://reader`}:9010`;
    export const DATASTORE_WRITER = `${process.env.INSTANCE_DOMAIN || 'http://writer'}:9011`;
}

export namespace Keys {
    const encoding = 'utf8';
    /**
     * rem: effectively, you try to alter the host file system by writing files.
     * My docker deamon heavily denies that, resulting in errors during execution:
     * `mkdir: cannot create directory './src/config/keys': Permission denied`
     */
    const pathToKeys = 'src/config/keys';

    export function publicTokenKey(): string {
        return fs.readFileSync(getFile('rsa-token.key.pub'), encoding);
    }

    export function publicCookieKey(): string {
        return fs.readFileSync(getFile('rsa-cookie.key.pub'), encoding);
    }

    export function privateTokenKey(): string {
        return fs.readFileSync(getFile('rsa-token.key'), encoding);
    }

    export function privateCookieKey(): string {
        return fs.readFileSync(getFile('rsa-cookie.key'), encoding);
    }

    function getFile(path: string): string {
        if (!path.startsWith('/')) {
            path = '/' + path;
        }
        return `${pathToKeys}${path}`;
    }
}
