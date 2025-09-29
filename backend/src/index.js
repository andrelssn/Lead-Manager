const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const leadsRouter = require('./routes/leads');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/leads', leadsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
