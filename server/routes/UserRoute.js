import express from "express";
import UserController from "../controller/index.js";
import OrganizationController from "../controller/OrganizationController.js";


const router = express.Router();

router.post('/api/v1', UserController)

router.get('/api/v1/organizations', OrganizationController)

export default router;

