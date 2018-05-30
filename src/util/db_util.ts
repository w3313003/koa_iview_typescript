import { config } from '../config/config';
import { ConnectionOptions } from 'tls';
const mysql = require("mysql")

const dbInfo = config.database;

const pool = mysql.createPool({
    host: dbInfo.host,
    port: dbInfo.port,
    username: dbInfo.username,
    password: dbInfo.password,
    database: dbInfo.database
})

let query = function (sql: string | object, values: object) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err: any, conn: any) => {
            if (err) {
                reject(err)
                return;
            };
            conn.query(sql, values, (err: ExceptionInformation, result: object) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
                conn.release();
            })
        })
    })
};

let createTable = (sql: string) => {
    return query(sql, [])
};

/**
 * 
 * @param {string} table 
 * @param {number} id 
 * @returns 
 */
let findDataById = function (table: string, id: number) {
    let _sql = "SELECT * FROM ?? WHERE id = ? "
    return query(_sql, [table, id ])
}

