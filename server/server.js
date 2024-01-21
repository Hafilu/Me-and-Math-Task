import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { config } from 'dotenv';
import router from './router/router.js';
 

/** import connection file */
import connect from './database/conn.js';

const app = express()

/** app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();
 


/** appliation port */
const port = process.env.PORT || 8080;


 

/** routes */
app.use('/api', router) /** apis */



// --------------------------deployment------------------------------

const __dirname1 = path.resolve();
const parentDir = path.join(__dirname1, '..');
 
 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(parentDir, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(parentDir, "client", "build", "index.html"))
  );
} else {
    app.get('/', (req, res) => {
        try {
            res.json("Get Request")
        } catch (error) {
            res.json(error)
        }
    })
    
}



/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})
