import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':telegramId')
  findOne(@Param('telegramId') telegramId: string) {
    return this.usersService.findOrCreate(telegramId);
  }

  @Post(':telegramId/money')
  updateMoney(
    @Param('telegramId') telegramId: string,
    @Body('money') money: number
  ) {
    return this.usersService.updateMoney(telegramId, money);
  }

  @Post(':telegramId/buy')
  buyItem(
    @Param('telegramId') telegramId: string,
    @Body() data: { itemId: number; type: string; price: number }
  ) {
    return this.usersService.buyItem(
      telegramId,
      data.itemId,
      data.type,
      data.price
    );
  }
} 