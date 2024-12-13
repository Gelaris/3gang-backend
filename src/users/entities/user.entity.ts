import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserItem } from './user-item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramId: string;

  @Column({ default: 0 })
  money: number;

  @Column({ default: 1 })
  level: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;

  @OneToMany(() => UserItem, item => item.user)
  items: UserItem[];
} 