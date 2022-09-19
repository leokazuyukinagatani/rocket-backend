const { Router } = require("express")

const RocketsController = require("../controllers/RocketsController")

const rocketsRoutes = Router()

const rocketsController = new RocketsController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

rocketsRoutes.use(ensureAuthenticated)

rocketsRoutes.get("/", rocketsController.index)

rocketsRoutes.post("/", rocketsController.create)

rocketsRoutes.delete("/:id", rocketsController.delete)

module.exports = rocketsRoutes;