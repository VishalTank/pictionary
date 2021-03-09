import { Router } from 'express';

import { UserController } from './user.controller';

class UserRoutes {
	private userController: UserController = new UserController();
	public router: Router;

	constructor() {
		this.router = Router();
		this.registerMethods();
	}

	registerMethods(): void {
		this.router.post('/create', this.userController.createUser);
	}
}

export default new UserRoutes().router;
