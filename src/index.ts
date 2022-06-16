import cors from 'cors';
import express from 'express';

import { PORT } from './config';

import { json } from 'body-parser';
import { logger } from './api/v1/utils/logger';

import { pingRoutes } from './api/v1/main.route';
import { userRoutes } from './api/v1/user/user.routes'
import { rendleRoutes } from './api/v1/rendles/rendle.routes'
import { renderScanRoutes } from './api/v1/renderscan/renderscan.routes'

const app = express();

const init = () => logger.info(`🚀  server running on port: ${PORT}`)

app.use(cors())
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("🚀  WELCOME TO RENDERVERSE"))
app.use(pingRoutes);
app.use(userRoutes);
app.use(rendleRoutes);
app.use(renderScanRoutes);

app.listen(PORT, () => init());