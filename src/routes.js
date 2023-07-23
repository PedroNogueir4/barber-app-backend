import { Router } from "express"
import UserController from "./app/controllers/UserController"
import LoginController from "./app/controllers/LoginController"
import HaircutsController from "./app/controllers/HaircutsController"

import authMiddleware from "./app/middlewares/auth"

const routes = new Router()

routes.get("/", (req, res) => {
  return res.json({ message: "Hello Word!" })
})

routes.post("/users", UserController.store)

routes.post("/login", LoginController.store)

routes.use(authMiddleware)

routes.post("/haircuts", HaircutsController.store)
routes.get("/haircuts", HaircutsController.index)

export default routes
