import express from 'express';

const app = express();

app.use(express.static('./build'));

app.listen(3000, () => {console.log('FE server running')});