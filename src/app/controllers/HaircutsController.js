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

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        price: Yup.number(),
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

      const { id } = req.params
      const haircutUpdate = await Haircut.findByPk(id)

      if (!haircutUpdate) {
        return res.status(404).json({ error: "Envie o Id do produto" })
      }

      const { name, price } = req.body

      await Haircut.update(
        {
          name,
          price,
        },
        {
          where: { id },
        },
      )

      return res.status(200).json({
        message: "Produto atualizado",
      })
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req, res) {
    try {
      const { admin: isAdmin } = await User.findByPk(req.userId)

      if (!isAdmin) {
        return res.status(401).json()
      }
      const { id } = req.params

      await Haircut.destroy({
        where: { id },
      })
      return res.json({ message: "Produto deletado com sucesso!" })
    } catch (error) {
      console.log(error)
    }
  }
}
export default new HaircutsController()
