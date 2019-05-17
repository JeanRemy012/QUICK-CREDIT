import dotenv from 'dotenv';
import { Pool } from 'pg';
import uuid from 'uuid';
import Helper from '../helpers/helper';

import 'babel-polyfill';

dotenv.config();
if (process.env.NODE_ENV === 'test') {
    process.env.PGDATABASE = 'test';
}
class Database {
    constructor() {
        this.pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });

        this.connect = async() => this.pool.connect();

        this.userTable = `
    CREATE TABLE IF NOT EXISTS user_table (
    id UUID PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    othername VARCHAR(30),
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    phone_number CHAR(15) NOT NULL,
    registered DATE NOT NULL,
    is_admin int NOT NULL,
    password VARCHAR(120) NOT NULL,
    token VARCHAR(120),
    confirmed int NOT NULL
        );
        `;
        this.loanTable = `
    CREATE TABLE IF NOT EXISTS laon_table (
        id UUID PRIMARY KEY,
        created_on DATE NOT NULL,
        location VARCHAR(128) NOT NULL,
        topic TEXT NOT NULL,
        happening_on DATE NOT NULL

    );
    `;


        this.resevationTable = `
    CREATE TABLE IF NOT EXISTS rsvp_table (
        id UUID PRIMARY KEY,
        created_on DATE NOT NULL,
        user_id UUID REFERENCES user_table (id) ON DELETE CASCADE,
        meetup_id UUID REFERENCES meetup_table (id) ON DELETE CASCADE,
        answer VARCHAR(6) NOT NULL
    );
    `;

        this.tagTable = `
    CREATE TABLE IF NOT EXISTS tag_table (
        id UUID PRIMARY KEY,
        tag_name VARCHAR(128) NOT NULL
    );
    `;

        this.initializeDb();
    }

    async executeQuery(query, data = []) {
        const connection = await this.connect();
        try {

            if (data.length) {
                return await connection.query(query, data);
            }

            return await connection.query(query);
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    }



    async createAdmin() {
        try {
            this.adminUser = [
                uuid.v4(),
                'Jean Remy',

                'HARERIMANA',
                'admin@quickcredit.com',
                'admin',
                '+',
                new Date(),
                1,
                Helper.hashPassword('Admin@2019', 12),
                'Ve23U4se8r',
                1,
            ];
            this.sql = `INSERT INTO user_table (firstname,othername,
        lastname,email,username,phone_number,registered,is_admin,password,token,confirmed)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`;
            this.adminUser = await this.executeQuery(this.sql, this.adminUser);
        } catch (error) {
            return error;
        }
    }
}
export default new Database();