"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const hashing_service_1 = require("../hashing/hashing.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("../config/jwt.config");
let AuthenticationService = class AuthenticationService {
    constructor(usersRepository, hashingService, jwtService, jwtConfiguration) {
        this.usersRepository = usersRepository;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
        this.jwtConfiguration = jwtConfiguration;
    }
    async signUp(signUpDto) {
        try {
            const user = new user_entity_1.User();
            user.email = signUpDto.email;
            user.password = await this.hashingService.hash(signUpDto.password);
            await this.usersRepository.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException();
            }
            throw error;
        }
    }
    async signIn(signInDto) {
        const user = await this.usersRepository.findOneBy({ email: signInDto.email });
        if (user) {
            const isEqual = await this.hashingService.compare(signInDto.password, user.password);
            if (!isEqual) {
                throw new common_1.UnauthorizedException('密码不正确.');
            }
            return await this.generateToken(user);
        }
        else {
            throw new common_1.UnauthorizedException('该用户稍未注册.');
        }
    }
    async generateToken(user) {
        const [accessToken, refreshToken] = await Promise.all([
            await this.signToken(user.id, this.jwtConfiguration.accessTokenTtl, { email: user.email, role: user.role }),
            await this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
        ]);
        return {
            accessToken, refreshToken
        };
    }
    async refreshToken(refreshTokenDto) {
        try {
            const { sub } = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
            });
            const user = await this.usersRepository.findOneByOrFail({ id: sub });
            return this.generateToken(user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    async signToken(userId, expiresIn, payload) {
        return await this.jwtService.signAsync({
            sub: userId,
            ...payload,
        }, {
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            secret: this.jwtConfiguration.secret,
            expiresIn: expiresIn,
        });
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, common_1.Inject)(jwt_config_1.default.KEY)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hashing_service_1.HashingService,
        jwt_1.JwtService, void 0])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map