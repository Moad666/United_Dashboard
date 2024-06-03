const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const csurf  = require('csurf');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 3001; // Choose a port for your server
require('dotenv').config();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(csrf({ cookie: true })); // CSRF protection
// app.use(csurf({ cookie: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// // CSRF protection middleware
// const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection);

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/AuthRoutes");
const applicationRoutes = require("./routes/ApplicationsRoutes");
const nodeRoutes = require("./routes/NodesRoutes");
const queueManagerRoutes = require("./routes/QueueManagerRoutes");

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', applicationRoutes);
app.use('/', nodeRoutes);
app.use('/', queueManagerRoutes);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});