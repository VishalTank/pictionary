import { Router } from 'express';

import RoomRouter from './room/room.routes';
import UserRouter from './user/user.routes';

const router: Router = Router();

router.use('/room', RoomRouter);
router.use('/user', UserRouter);

export default router;
