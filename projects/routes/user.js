import express from "express"
import controller from "../controllers/userController.js"

const router = express.Router();

router.get('/',controller.test)
router.post('/register', controller.registerUser)
router.post('/login', controller.login)
router.put(`/change/username/:id`, controller.changeUsername)
router.put('/change/password/:id', controller.changePassword)
export default router