import express from "express";
const router = express.Router();
import pool from "../config/db.js";

// GET all users
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT 1 + 1 AS two;');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
