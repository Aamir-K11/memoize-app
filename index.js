const express = require('express');
require('dotenv').config();


const app = express();
require('./startup/routes')(app);



app.listen(process.env.PORT || 8000, ()=> {console.log(`Listening on port 5000`)});
