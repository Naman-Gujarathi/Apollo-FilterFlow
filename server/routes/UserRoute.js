import express from "express";
import UserController from "../controller/index.js";


const router = express.Router();

router.post('/api/v1', UserController)

export default router;

