import { Router } from 'express';

import { SampleRouter } from './sample/sample.routes';
import RoomRouter from './room/room.routes';

const router: Router = Router();

router.use('/sample', SampleRouter);
router.use('/room', RoomRouter);

export default router;
