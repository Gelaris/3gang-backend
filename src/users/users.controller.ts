import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':telegramId')
  async findOne(@Param('telegramId') telegramId: string) {
    return this.usersService.findOrCreate(telegramId);
  }

  @Post(':telegramId/money')
  async updateMoney(
    @Param('telegramId') telegramId: string,
    @Body() body: { money: number },
  ) {
    return this.usersService.updateMoney(telegramId, body.money);
  }
} 