import * as Yup from "yup"
import Haircut from "../models/Haircuts"
import Schedule from "../schemas/Schedule"

class ScheduleController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        haircut: Yup.array()
          .required()
          .of(
            Yup.object().shape({
              id: Yup.number().required(),
              day: Yup.string().required(),
              time: Yup.string().required(),
            }),
          ),
      })

      try {
        schema.validateSync(req.body, { abortEarly: false })
      } catch (error) {
        return res.status(400).json({ error: error.errors })
      }

      const id = req.body.haircut.map((order) => order.id)
      const day = req.body.haircut.map((order) => order.day)
      const time = req.body.haircut.map((order) => order.time)

      const haircutRequest = await Haircut.findAll({ where: { id } })

      const newSchedule = haircutRequest.map((prd) => {
        const attHaircut = {
          id: prd.id,
          name: prd.name,
          price: prd.price,
        }
        return attHaircut
      })

      const scheduleSchema = {
        user: {
          id: req.userId,
          name: req.userName,
          number: req.phoneNumber,
        },
        haircut: newSchedule,
        status: "Agendamento Realizado",
        day: day[0],
        time: time[0],
      }

      const finallySchedule = await Schedule.create(scheduleSchema)

      return res.status(201).json(finallySchedule)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new ScheduleController()
