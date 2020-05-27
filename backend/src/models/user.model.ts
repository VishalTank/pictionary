import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import { Room } from './room.model';

@Entity()
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@Column({ nullable: true })
	email: string;

	@Column({ nullable: true })
	password: string;

	@Column({ default: false })
	isAdmin: boolean;

	@ManyToOne(() => Room, room => room.members)
	@JoinColumn({ name: 'room_id' })
	memberIn: Room;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}

export interface IUser {
	id?: number;
	name: string;
	email?: string;
	password?: string;
	isAdmin?: boolean;
	memberIn?: Room;
	createdAt?: Date;
	updatedAt?: Date;
}
