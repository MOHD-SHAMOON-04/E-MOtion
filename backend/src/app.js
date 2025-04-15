import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Routes
import driverRoute from "./routes/driver.route.js"
import dbRoute from "./routes/db.route.js";

let PORT = process.env.PORT;

const app = express();

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static and View Setup
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));


app.get('/', (req, res) => {
    res.render('index.ejs', { title: 'Home' });
});

app.use('/db', dbRoute);
app.use("/driver", driverRoute);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}, http://localhost:${PORT}`);
})

