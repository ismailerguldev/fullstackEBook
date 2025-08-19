import express from "express"
const router = express.Router();
import controller from "../controllers/userController.js"


router.get('/',controller.test)
router.post('/register', controller.registerUser)
router.post('/login', controller.login)
router.put('/add/favoritebook/:id', controller.addFavBook)
router.put('/add/readedbook/:id', controller.addReadedBook)
router.put(`/change/username/:id`, controller.changeUsername)
router.put('/change/password/:id', controller.changePassword)
export default router