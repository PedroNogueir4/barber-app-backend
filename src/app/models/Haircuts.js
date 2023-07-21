import Sequelize, { Model } from "sequelize"

class Haircut extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
      },
      {
        sequelize,
      },
    )
  }
}
export default Haircut
