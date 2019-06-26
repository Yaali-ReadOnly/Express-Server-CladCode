"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const options = {
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    hooks: {
        beforeValidate: () => {
          // Do stuff
        }
    }
}
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    options
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/* Don't remove this commented code - venkat */

/* fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
 */

/* Sort Directory Function - Venkat */
const files = [];
const sortDir = maniDir => {
  const folders = [];
  const CheckFile = filePath => fs.statSync(filePath).isFile();
  const sortPath = dir => {
    fs.readdirSync(dir)
      .filter(file => file.indexOf(".") !== 0 && file !== basename)
      .forEach(res => {
        const filePath = path.join(dir, res);
        if (CheckFile(filePath)) {
          files.push(filePath);
        } else {
          folders.push(filePath);
        }
      });
  };
  folders.push(maniDir);
  let i = 0;
  do {
    sortPath(folders[i]);
    i += 1;
  } while (i < folders.length);
};

//Sort Directory Call
sortDir(__dirname);

files.forEach(file => {
  const model = sequelize.import(file);
  db[model.name] = model;
});


//Model to DB Association
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    //console.log("My Models", modelName);
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;

module.exports = db;
