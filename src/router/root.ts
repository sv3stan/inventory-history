import express from 'express';
import { getRootHandler } from '../controllers/root';
const router = express.Router();
router.get('/', getRootHandler);
export default router;
