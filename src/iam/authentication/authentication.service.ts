import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly hashingService: HashingService,
        private jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>

    ) { }

    async signUp(signUpDto: SignUpDto) {
        try {
            const user = new User()
            user.email = signUpDto.email
            user.password = await this.hashingService.hash(signUpDto.password)
            await this.usersRepository.save(user)
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException()
            }
            throw error
        }

    }

    async signIn(signInDto: SignInDto) {
        const user = await this.usersRepository.findOneBy({ email: signInDto.email })
        if (user) {
            const isEqual = await this.hashingService.compare(signInDto.password, user.password)
            if (!isEqual) {
                throw new UnauthorizedException('密码不正确.')
            }
            return await this.generateToken(user);
        } else {
            throw new UnauthorizedException('该用户稍未注册.')
        }
    }

    async generateToken(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
            await this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, { email: user.email,role:user.role }),
            await this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
        ]);

        return {
            accessToken, refreshToken
        };
    }

    async refreshToken(refreshTokenDto:RefreshTokenDto){
        try {
            const {sub} = await this.jwtService.verifyAsync<Pick<ActiveUserData,'sub'>>(refreshTokenDto.refreshToken,{
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
            })
            const user = await this.usersRepository.findOneByOrFail({id:sub})
            return this.generateToken(user)
        } catch (error) {
            throw new UnauthorizedException()
        }
    }

    private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn: expiresIn,
            }
        );
    }
}
