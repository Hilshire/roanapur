"use strict"

let fs = require("fs"),
    path = require("path")
let Sequelize = require("sequelize")
let env = process.env.NODE_ENV || "development"
const config = require("../config.json")["db"][env]

// see this: https://github.com/sequelize/sequelize/issues/8417#issuecomment-335124373
config.operatorsAliases = Sequelize.Op
config.storage = path.join(__dirname, '../../', config.storage)

let sequelzie = new Sequelize(config),
    db = {}

fs.readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf(".") !== 0) && (file !== "index.js")
    })
    .forEach(file => {
      let model = sequelzie.import(path.join(__dirname, file))
      db[model.name] = model
    })

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
})

db.sequelize = sequelzie
db.Sequelize = Sequelize
module.exports = db
