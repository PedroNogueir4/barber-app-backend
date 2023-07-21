import Sequelize from "sequelize"
import configDataBase from "../config/database"

import User from "../app/models/User"
import Haircut from "../app/models/Haircuts"

const models = [User, Haircut]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDataBase)
    models.map((model) => model.init(this.connection))
  }
}
export default new Database()
