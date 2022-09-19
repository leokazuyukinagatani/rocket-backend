const { Router } = require("express")

const usersRouter = require("./user.routes")

const rocketsRouter = require("./rockets.routes")

const sessionsRouter = require("./sessions.routes")

const routes = Router()

routes.use("/user", usersRouter)
routes.use("/rockets", rocketsRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes;