import * as sqlite3 from 'sqlite3';
import { NextApiRequest, NextApiResponse } from 'next';


const dbFile = './visrun.db';

export async function initDatabase() {
    const db = new sqlite3.Database(dbFile);
    const createTableSql = `
    CREATE TABLE IF NOT EXISTS visrun (
        datetime TEXT NOT NULL PRIMARY KEY,
        lat TEXT NOT NULL,
        lng TEXT NOT NULL
    )`.trim();
    db.serialize(() => db.run(createTableSql));
    db.close();
}
async function main(req: NextApiRequest, res: NextApiResponse) {
    initDatabase();
    res.write('DB Created');
    res.end();
}
export default main;