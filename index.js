import express from 'express';
import bodyParser from 'body-parser';

import routes from './server/routes/indexRoutes';

require('dotenv').config();

const app = express();
const router = express.Router();

routes(router);

//parse json application
app.use(bodyParser());

//passing the router variable to all routes
app.use('/', router);

// expose the server to supertest

app.listen(process.env.PORT || 9000, () => {
  console.log('Server listening on port 9000');
});

export default app;
