import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthenticationService {
    private readonly usersRepository;
    private readonly hashingService;
    private jwtService;
    private readonly jwtConfiguration;
    constructor(usersRepository: Repository<User>, hashingService: HashingService, jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>);
    signUp(signUpDto: SignUpDto): Promise<void>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateToken(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private signToken;
}
