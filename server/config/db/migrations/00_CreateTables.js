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

const { DataTypes } = require("sequelize");

module.exports = (DB) => {
  const _DB = DB.getQueryInterface();
  return {
    up: async () => {
      await _DB.createTable("lookups", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        city: { type: DataTypes.STRING, allowNull: true },
        country: { type: DataTypes.STRING, allowNull: true },
        lat: { type: DataTypes.FLOAT, allowNull: true },
        lng: { type: DataTypes.FLOAT, allowNull: true },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      });
    },
    down: async () => {
      await _DB.deleteTable("lookups");
    },
  };
};
