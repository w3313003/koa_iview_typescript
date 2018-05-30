"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const mysql = require("mysql");
const { host, port, user, password, database } = config_1.config.database;
const pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database
});
let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err);
                return;
            }
            conn.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
                conn.release();
            });
        });
    });
};
let createTable = (sql) => {
    return query(sql, []);
};
/**
 * @param {string} table
 * @param {number} id
 * @returns
 */
let findDataById = function (table, id) {
    let _sql = "SELECT * FROM ?? WHERE id = ? ";
    return query(_sql, [table, id]);
};
/**
 * @param {string} table
 * @param {string} filed
 * @param {number} start
 * @param {number} end
 * @returns {Promise<object>}
 */
let findDataByPage = function (table, filed, start = 0, end = Number.MAX_SAFE_INTEGER) {
    let _sql = "SELECT ?? FROM ?? LIMIT ? ? ";
    return query(_sql, [filed, table, start, end]);
};
/**
 * @param {string} table
 * @param {object} values
 * @param {number} id
 * @returns {Promise<object>}
 */
let updateData = function (table, values, id) {
    let _sql = "UPDATE ?? SET ? WHERE ID = ?";
    return query(_sql, [table, values, id]);
};
/**
 *
 * @param {string} table
 * @param {string} values
 * @returns {Promise<object>}
 */
let insertData = function (table, values) {
    let _sql = "INSERT INTO ?? SET ?";
    return query(_sql, [table, values]);
};
/**
 * @param {string} table
 * @param {number} id
 * @returns {Promise<object>}
 */
let deleteDataById = function (table, id) {
    let _sql = "DELETE FROM ?? WHERE id = ?";
    return query(_sql, [table, id]);
};
/**
 *
 * @param {string} table
 * @param {object} filed
 * @returns {Promise<object>}
 */
let select = function (table, filed) {
    let _sql = "SELECT ?? FROM ?? ";
    return query(_sql, [filed, table]);
};
/**
 * @param {string} table
 * @returns {Promise<object>}
 */
let count = function (table) {
    let _sql = "SELECT COUNT(*) AS total_count FROM ?? ";
    return query(_sql, [table]);
};
exports.default = {
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
//# sourceMappingURL=db_util.js.map