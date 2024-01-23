import { MusicService } from './music.service';
export declare class MusicController {
    private readonly musicService;
    constructor(musicService: MusicService);
    findAll(): string;
}
