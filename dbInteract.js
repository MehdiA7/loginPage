const dotenv = require("dotenv");
const mariadb = require("mariadb");
dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

class dbInteract {
    async aQuery(query) {
        let connection;
        try {
            connection = await pool.getConnection();
            const data = await connection.query(query);
            return data
        } catch(err) {
            throw err;
        } finally {
            if (connection) connection.release();
        }
    }

    async allTables(){
        return await this.aQuery("SHOW TABLES")
    }

    async allElementInTables(tableName){
        return await this.aQuery(`SELECT * FROM ${tableName}`);
    }

    async getAllEmailAndPass(){
        return await this.aQuery(`SELECT email, password FROM users`);
    }

    async newUser(firstName, lastName, email, password){
        return await this.aQuery(`INSERT INTO users (firstname, lastName, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`);
    };
}

module.exports = dbInteract;
