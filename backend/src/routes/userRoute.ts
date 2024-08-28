import express , {Response , Request} from 'express';
import { createUser , logInUser, logOutUser, verifyToken } from '../controller/userController';
const router = express.Router();

router.post("/register" , createUser);
router.post("/login" , logInUser);
router.post("/log_out" , logOutUser);
router.get("/validate_token" , verifyToken , (req:Request , res:Response) => {
    res.status(200).json({userId: req.userId  });
});
export default router;