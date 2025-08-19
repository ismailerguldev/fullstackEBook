import express from "express"
import controller from "../controllers/bookController.js"
const router = express.Router()
router.put("/add/favoritebook/:id", controller.addFavBook)
router.put("/add/readedbook/:id", controller.addReadedBook)
export default router