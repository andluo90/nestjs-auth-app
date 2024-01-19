import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { UsersModule } from './users/users.module';
import { HashingService } from './iam/hashing/hashing.service';
import { BcryptService } from './iam/hashing/bcrypt.service';

@Module({
  imports: [CoffeesModule, UsersModule,TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'pass123',
    database:'postgres',
    autoLoadEntities:true,
    synchronize:true
  })],
  controllers: [AppController],
  providers: [AppService, HashingService, BcryptService],
})
export class AppModule {}
