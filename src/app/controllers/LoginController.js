import * as Yup from "yup"
import User from "../models/User"

class LoginController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: "Email incorreto,tente novamente!" })
    }

    const { email } = req.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      return res.status(404).json({ error: "Esse email não esta cadastrado!" })
    }

    if (user && user.admin) {
      const passwordAdm = req.body.password_hash

      if (user.password_hash === passwordAdm) {
        return res.status(200).json({
          id: user.id,
          email: user.email,
          admin: user.admin,
        })
      } else {
        return res.status(404).json({ error: "Senha incorreta!" })
      }
    }

    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      admin: user.admin,
    })
  }
}
export default new LoginController()
