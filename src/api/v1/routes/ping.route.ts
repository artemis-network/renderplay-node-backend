import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/api/v1/ping", (req: Request, res: Response) => res.send("Welcome to RENDERVERSE BACKEND"))

export { router as pingRoutes }