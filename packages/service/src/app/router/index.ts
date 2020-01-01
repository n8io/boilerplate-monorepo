import express from 'express';
import { heartbeat } from './heartbeat';
import { refreshToken } from './refreshToken';
import { Route } from '../../types/route';

const router = express.Router();

router.get(Route.HEARTBEAT, heartbeat);
router.post(Route.REFRESH_TOKEN, refreshToken);

export { router };
