const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const UsersController = require("../controllers/UsersController")

const RocketAvatarController = require("../controllers/RocketAvatarController")

const usersRoutes = Router()

const usersController = new UsersController()

const rocketAvatarController = new RocketAvatarController()

const upload = multer(uploadConfig.MULTER)

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), rocketAvatarController.update)

module.exports = usersRoutes