import express from "express";
import { map } from "../controllers/driver.controller.js";


const router = express.Router();

router.get("/map", map);


export default router;