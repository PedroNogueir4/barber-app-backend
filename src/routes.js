import { Router } from "express"
import UserController from "./app/controllers/UserController"
import LoginController from "./app/controllers/LoginController"

const routes = new Router()

routes.get("/", (req, res) => {
  return res.json({ message: "Hello Word!" })
})

routes.post("/users", UserController.store)

routes.post("/login", LoginController.store)

export default routes
