import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { UsersModule } from './users/users.module';
import { IamModule } from './iam/iam.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'musicFiles'),
      serveRoot: '/musicFiles'
    }),
    ConfigModule.forRoot(),
    CoffeesModule, UsersModule,IamModule,TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'pass123',
    database:'postgres',
    autoLoadEntities:true,
    synchronize:true
  }), IamModule, MusicModule],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
