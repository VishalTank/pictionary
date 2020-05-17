import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, BaseEntity, Unique } from 'typeorm';

@Entity()
export class Room extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	room_id: string;

	@Column('text', { array: true })
	members: string[];

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
