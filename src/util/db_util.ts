import { config } from '../config/config';
import * as mysql from "mysql";
import { arrayExpression } from 'babel-types';

const {host, port, user, password, database} = config.database;

const pool = mysql.createPool({
    host, 
    port, 
    user, 
    password, 
    database
});
let a: number | string;

let query = function (sql: string, values?: object): Promise<object>{
    return new Promise<object>((resolve, reject) => {
        pool.getConnection((err: any, conn: any) => {
            if (err) {
                reject(err);
                return;
            }
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
 * @param {string} table
 * @param {number} id 
 * @returns 
 */
let findDataById = function (table: string, id: number) {
    let _sql = "SELECT * FROM ?? WHERE id = ? "
    return query(_sql, [table, id ])
};

/**
 * @param {string} table
 * @param {string} filed
 * @param {number} start
 * @param {number} end
 * @returns {Promise<object>}
 */
let findDataByPage = function(table: string, filed: string, start: number = 0, end: number = Number.MAX_SAFE_INTEGER) {
    let _sql = "SELECT ?? FROM ?? LIMIT ? ? ";
    return query(_sql, [filed, table, start, end]);
};


/**
 * @param {string} table
 * @param {object} values
 * @param {number} id
 * @returns {Promise<object>}
 */
let updateData = function(table: string, values: object, id: number) {
    let _sql = "UPDATE ?? SET ? WHERE ID = ?";
    return query(_sql, [table, values, id]);
};

/**
 *
 * @param {string} table
 * @param {string} values
 * @returns {Promise<object>}
 */
let insertData = function( table: string, values: string ) {
	let _sql = "INSERT INTO ?? SET ?";
	return query( _sql, [ table, values ] )
};

/**
 * @param {string} table
 * @param {number} id
 * @returns {Promise<object>}
 */
let deleteDataById = function(table: string, id: number) {
    let _sql = "DELETE FROM ?? WHERE id = ?";
    return query(_sql, [table, id]);
};

/**
 *
 * @param {string} table
 * @param {object} filed
 * @returns {Promise<object>}
 */
let select = function( table: string, filed: string ) {
	let  _sql =  "SELECT ?? FROM ?? "
	return query( _sql, [ filed, table ] )
};

/**
 * @param {string} table
 * @returns {Promise<object>}
 */
let count = function( table: string ) {
	let  _sql =  "SELECT COUNT(*) AS total_count FROM ?? ";
	return query( _sql, [ table ] )
};


export default {
    query,
	createTable,
	findDataById,
	findDataByPage,
	deleteDataById,
	insertData,
	updateData,
	select,
	count,
};
