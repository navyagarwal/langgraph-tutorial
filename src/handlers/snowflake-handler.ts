import { BaseHandler } from './base-handler';
import { createConnection, Connection } from 'snowflake-sdk';

export class SnowflakeHandler extends BaseHandler {
    private connection: Connection;

    constructor(
        private config: {
        account: string;
        username: string;
        password: string;
        warehouse: string;
        database: string;
        schema: string;
        }
    ) {
        super();
        this.connection = createConnection(config);
    }

    async handle(data: any): Promise<void> {
        try {
            await this.connection.connect();
            const query = `INSERT INTO AI_LOGS (timestamp, action, payload) 
            VALUES (CURRENT_TIMESTAMP(), ?, ?)`;
            await this.connection.execute({
                sqlText: query,
                binds: [data.action, JSON.stringify(data.payload)]
            });
        } finally {
            await this.connection.destroy();
        }
    }
}