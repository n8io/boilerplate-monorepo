import express from 'express';
import { Route } from 'types/route';
import { heartbeat } from './heartbeat';
import { refreshToken } from './refreshToken';
import { voyager } from './voyager';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get(Route.HEARTBEAT, heartbeat);
router.post(Route.REFRESH_TOKEN, refreshToken);
router.get(Route.VOYAGER, voyager);

export { router };
