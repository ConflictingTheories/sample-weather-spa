/*                                            *\
** ------------------------------------------ **
**           Sample - Weather SPA    	      **
** ------------------------------------------ **
**  Copyright (c) 2020 - Kyle Derby MacInnis  **
**                                            **
** Any unauthorized distribution or transfer  **
**    of this work is strictly prohibited.    **
**                                            **
**           All Rights Reserved.             **
** ------------------------------------------ **
\*                                            */

const Sequelize = require("sequelize");
// Connection to Database (SQL ORM)

class Database {
  static instance = null;
  constructor() {
    if (this.instance) return this.instance;
    else {
      this.instance = new Sequelize({
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
        dialect: process.env.DB_TYPE,
        pool: {
          max: 30,
        },
        connectTimeout: 30000,
        acquireTime: 60000,
      });
      return this.instance;
    }
  }
}

module.exports = new Database();
