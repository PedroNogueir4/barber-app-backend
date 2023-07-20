import * as Yup from "yup"
import User from "../models/User"

class UserController {
  async store(req, res) {
    try {
      const userSchema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password_hash: Yup.string().min(6),
        phone_number: Yup.string().required().min(9),
        admin: Yup.boolean(),
      })

      try {
        userSchema.isValidSync(req.body, { abortEarly: false })
      } catch (error) {
        return res.status(400).json({ error: error.errors })
      }

      const { name, email, password_hash, phone_number, admin } = req.body

      const emailExists = await User.findOne({
        where: { email },
      })

      if (emailExists) {
        return res.status(409).json({ error: "User already exists" })
      }

      const user = await User.create({
        name,
        email,
        password_hash,
        phone_number,
        admin,
      })

      return res.status(201).json({ id: user.id, name, email, admin })
    } catch (error) {
      console.error(error)
    }
  }
}
export default new UserController()
