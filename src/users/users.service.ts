import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserItem } from './entities/user-item.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserItem)
    private userItemsRepository: Repository<UserItem>,
  ) {}

  async findOrCreate(telegramId: string): Promise<User> {
    let user = await this.usersRepository.findOne({ 
      where: { telegramId },
      relations: ['items']
    });
    
    if (!user) {
      user = this.usersRepository.create({ telegramId });
      await this.usersRepository.save(user);
    }
    
    return user;
  }

  async updateMoney(telegramId: string, money: number): Promise<User> {
    const user = await this.findOrCreate(telegramId);
    user.money = money;
    user.lastUpdated = new Date();
    return this.usersRepository.save(user);
  }

  async buyItem(telegramId: string, itemId: number, type: string, price: number): Promise<boolean> {
    const user = await this.findOrCreate(telegramId);
    
    if (user.money < price) {
      return false;
    }

    user.money -= price;
    await this.usersRepository.save(user);

    const userItem = this.userItemsRepository.create({
      user,
      itemId,
      type
    });
    await this.userItemsRepository.save(userItem);

    return true;
  }
} 