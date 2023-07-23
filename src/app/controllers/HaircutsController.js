import * as Yup from "yup"
import User from "../models/User"
import Haircut from "../models/Haircuts"

class HaircutsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
    })

    try {
      schema.validateSync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ error: error.errors })
    }

    const { admin: isAdmin } = await User.findByPk(req.userId)

    if (!isAdmin) {
      return res.status(401).json()
    }

    const { name, price } = req.body

    const product = Haircut.create({
      name,
      price,
    })

    return res.json(product)
  }

  async index(req, res) {
    const haircuts = await Haircut.findAll()

    return res.json(haircuts)
  }
}
export default new HaircutsController()
