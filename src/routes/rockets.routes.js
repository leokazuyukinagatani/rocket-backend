const { Router } = require("express")

const RocketsController = require("../controllers/RocketsController")

const rocketsRoutes = Router()

const rocketsController = new RocketsController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

rocketsRoutes.get("/all", rocketsController.all)
rocketsRoutes.use(ensureAuthenticated)

rocketsRoutes.get("/", rocketsController.index)
rocketsRoutes.get("/:id", rocketsController.show)
rocketsRoutes.post("/", rocketsController.create)
rocketsRoutes.put("/", rocketsController.update)
rocketsRoutes.delete("/:id", rocketsController.delete)

module.exports = rocketsRoutes;