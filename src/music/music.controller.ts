import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type-enums';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
    constructor(private readonly musicService:MusicService){}

    @Auth(AuthType.None)
    @Get()
    findAll() {
      return this.musicService.findAll();
    }
}
