import { Router } from "express"
import UserController from "./app/controllers/UserController"
import LoginController from "./app/controllers/LoginController"
import HaircutsController from "./app/controllers/HaircutsController"

import authMiddleware from "./app/middlewares/auth"
import ScheduleController from "./app/controllers/ScheduleController"

const routes = new Router()

routes.get("/", (req, res) => {
  return res.json({ message: "Hello Word!" })
})

routes.post("/users", UserController.store)

routes.post("/login", LoginController.store)

routes.use(authMiddleware)

routes.post("/haircuts", HaircutsController.store)
routes.put("/haircuts/:id", HaircutsController.update)
routes.delete("/haircuts/:id", HaircutsController.delete)
routes.get("/haircuts", HaircutsController.index)

routes.post("/schedule", ScheduleController.store)

export default routes
