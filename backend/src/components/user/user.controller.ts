import { Request, Response } from "express";

import User, { IUser } from '../../models/user.model';
import { logger } from './../../services/app.logger';

export class UserController {

	public createUser(req: Request, res: Response) {
		let user: IUser = new User(req.body);

		user.save()
			.then(savedData => {
				logger.info('User added successfully, user: ' + savedData);
				res.status(200).json(user);
			})
			.catch(err => {
				logger.error('Error while adding user:' + err);
				res.status(500).send(err);
			});
	}
}
