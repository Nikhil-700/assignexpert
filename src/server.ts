import dotenv from 'dotenv';
import { QueryResult } from 'pg';
import { queryWithTransaction, setupDatabase } from './database';
import { getClient, setupCache } from './cache';
dotenv.config();

async function main() {

    setupDatabase(process.env.DATABASE_URL || '')
    await queryWithTransaction("select 1+1 as result", function scanRows(result: QueryResult<any>): Error | undefined {            
        console.log(result.rows[0]);
        return undefined;             
    });

    setupCache(process.env.REDIS_URL || '', '', '')
    const client = getClient();
    await client.connect();
}

main()
.then(() => console.log('server is up!'))
.catch((err) => console.log(err));
