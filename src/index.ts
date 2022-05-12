import cors from 'cors';
import express from 'express';

import { json } from 'body-parser';
import { logger } from './api/v1/utils/logger';

import { pingRoutes } from './api/v1/routes/ping.route';
import { userRoutes } from './api/v1/routes/user.routes'
import { rendleRoutes } from './api/v1/routes/rendle.routes'
import { renderScanRoutes } from './api/v1/routes/renderscan.routes'
import { PORT } from './config';

const app = express();

const init = () => logger.info(`🚀  server running on port: ${PORT}`)

app.use(cors())
app.use(json());
app.use(pingRoutes);
app.use(userRoutes);
app.use(rendleRoutes);
app.use(renderScanRoutes);

app.listen(PORT, () => init());

export { app }

