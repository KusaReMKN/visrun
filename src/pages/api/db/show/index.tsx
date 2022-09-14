import * as sqlite3 from 'sqlite3';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs'
import { useState } from 'react';
import { LatLngTime } from '../../chart/Distancesum';


const dbFile = './visrun.db';

export async function jsonallview(): Promise<LatLngTime[]> {

    const db = new sqlite3.Database(dbFile);
    const selectsql = `SELECT * FROM visrun`

    const rows: LatLngTime[] = await new Promise((r) =>
        db.serialize(() => db.all(selectsql, (err, rows) => r(rows)))
    );
    db.close();

    return rows;
}
export default jsonallview;