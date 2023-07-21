import { Router } from "express"
import UserController from "./app/controllers/UserController"
import LoginController from "./app/controllers/LoginController"
import HaircutsController from "./app/controllers/HaircutsController"

const routes = new Router()

routes.get("/", (req, res) => {
  return res.json({ message: "Hello Word!" })
})

routes.post("/users", UserController.store)

routes.post("/login", LoginController.store)

routes.post("/haircuts", HaircutsController.store)

export default routes
