const express = require('express');
const app = express();
const routes = require('./routes/routes');
const errorHandler = require('./middleware/errorHandler')
const port = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
})


app.use(errorHandler);