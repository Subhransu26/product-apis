
import express from "express";
import { step1, step2, step3, step4, step5 } from "../controller/apiController.js";



const router = express.Router();

router.get("/step1", step1);
router.get("/step2", step2);
router.get("/step3", step3);
router.get("/step4", step4);
router.get("/step5", step5);

export default router;
