import { Router, Request, Response } from "express";
const router = Router()

router.get('/liveness', (_req: Request, res: Response) => res.json({message: 'On Live!'}))

export default router