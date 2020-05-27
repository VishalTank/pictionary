import { Router } from 'express';

import { SampleRouter } from './sample/sample.routes';
import RoomRouter from './room/room.routes';
import UserRouter from './user/user.routes';

const router: Router = Router();

router.use('/sample', SampleRouter);
router.use('/room', RoomRouter);
router.use('/user', UserRouter);

export default router;
