import express from 'express';

import { json } from 'body-parser';
import { logger } from './api/v1/utils/logger';
import { bootstrap } from './api/v1/bootstrap/init'

import { pingRoutes } from './api/v1/routes/ping.route';
import { userRoutes } from './api/v1/routes/user.routes'
import { rendleRoutes } from './api/v1/routes/rendle.routes'

const app = express();


const init = () => {
	logger.info("🚀  server started")
	logger.info("🚀  bootstrap initialization")
	bootstrap();
	logger.info("🚀  bootstrap completed")
}

app.use(json());
app.use(pingRoutes);
app.use(userRoutes);
app.use(rendleRoutes);


app.listen(3000, () => init());

