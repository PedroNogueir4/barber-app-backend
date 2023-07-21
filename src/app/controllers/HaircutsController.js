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

    const { name, price } = req.body
    const product = Haircut.create({
      name,
      price,
    })

    return res.json(product)
  }
}
export default new HaircutsController()
