import { Injectable } from '@nestjs/common';

@Injectable()
export class MusicService {

    findAll() {
        return `This action returns all music...`;
      }
}
