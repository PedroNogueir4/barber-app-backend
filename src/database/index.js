import Sequelize from "sequelize"
import mongoose from "mongoose"
import configDataBase from "../config/database"

import User from "../app/models/User"
import Haircut from "../app/models/Haircuts"

const models = [User, Haircut]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDataBase)
    models.map((model) => model.init(this.connection))
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/barberapp",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
  }
}
export default new Database()
