import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	email: string;

	@Column({ nullable: true })
	password: string;

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
	createdAt?: Date;
	updatedAt?: Date;
}
