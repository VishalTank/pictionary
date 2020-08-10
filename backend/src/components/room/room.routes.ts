import { Router } from 'express';

import { RoomController } from './room.controller';

class RoomRoutes {
	private roomController: RoomController = new RoomController();
	public router: Router;

	constructor() {
		this.router = Router();
		this.registerMethods();
	}

	registerMethods(): void {
		this.router.post('/create', this.roomController.createRoom);
		this.router.get('/get/:roomId', this.roomController.getRoom);
		this.router.post('/add_user/:roomId', this.roomController.addUserToRoom);
	}
}

export default new RoomRoutes().router;
