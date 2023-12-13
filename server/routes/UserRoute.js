import express from "express";
import UserSearchController from "../controller/UserSearchController.js";
import OrganizationController from "../controller/OrganizationSearchController.js";


const router = express.Router();

router.post('/api/v1', UserSearchController)

router.get('/api/v1/organizations', OrganizationController)

export default router;

