import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { UserItem } from './entities/user-item.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || process.env.PGHOST,
      port: parseInt(process.env.DB_PORT || process.env.PGPORT || '5432', 10),
      username: process.env.DB_USERNAME || process.env.PGUSER,
      password: process.env.DB_PASSWORD || process.env.PGPASSWORD,
      database: process.env.DB_DATABASE || process.env.PGDATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false // Для Railway это важно
      }
    }),
    TypeOrmModule.forFeature([User, UserItem])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
