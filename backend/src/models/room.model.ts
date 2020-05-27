import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, BaseEntity, Unique, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { User } from './user.model';

@Entity()
export class Room extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	room_id: string;

	@OneToMany(() => User, user => user.memberIn, { eager: true })
	members: User[];

	@Column('text', { array: true, nullable: true })
	chat: string[];

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}

export interface IRoom {
	id: number;
	room_id: string;
	members: string[];
	chat?: string[];
	createdAt?: Date;
	updatedAt?: Date;
}
