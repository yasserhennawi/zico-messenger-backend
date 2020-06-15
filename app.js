import express from 'express';
import bodyParser from 'body-parser';
import routes from './controllers';
// required to enable environment variables by dotenv lib. 
import { } from 'dotenv/config'
import mongoose from './mongoose';

// Opening database connection
mongoose();

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})

app.get("/", (req, res) => {
    res.send("Hello, express!")
})

routes(app)
