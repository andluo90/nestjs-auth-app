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
exports.ApiKeyGuard = void 0;
const common_1 = require("@nestjs/common");
const api_keys_service_1 = require("../../api-keys.service");
const typeorm_1 = require("typeorm");
const api_key_entity_1 = require("../../../../users/api-keys/entities/api-key.entity/api-key.entity");
const typeorm_2 = require("@nestjs/typeorm");
const iam_constants_1 = require("../../../iam.constants");
let ApiKeyGuard = class ApiKeyGuard {
    constructor(apiKeyService, apiKeyRepository) {
        this.apiKeyService = apiKeyService;
        this.apiKeyRepository = apiKeyRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const apiKey = this.extractKeyFromHeader(request);
        if (!apiKey) {
            throw new common_1.UnauthorizedException('apiKey empty.');
        }
        const apiKeyEntityId = this.apiKeyService.extracIdFromApiKey(apiKey);
        try {
            const apiKeyEntity = await this.apiKeyRepository.findOne({
                where: { uuid: apiKeyEntityId },
                relations: { user: true }
            });
            await this.apiKeyService.validate(apiKey, apiKeyEntity.key);
            request[iam_constants_1.REQUEST_USER_KEY] = {
                sub: apiKeyEntity.user.id,
                email: apiKeyEntity.user.email,
                role: apiKeyEntity.user.role,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.UnauthorizedException('ApiKey UnauthorizedException');
        }
        return true;
    }
    extractKeyFromHeader(request) {
        const [type, key] = request.headers.authorization?.split(' ') ?? [];
        return type === 'ApiKey' ? key : undefined;
    }
};
exports.ApiKeyGuard = ApiKeyGuard;
exports.ApiKeyGuard = ApiKeyGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(api_key_entity_1.ApiKey)),
    __metadata("design:paramtypes", [api_keys_service_1.ApiKeysService,
        typeorm_1.Repository])
], ApiKeyGuard);
//# sourceMappingURL=api-key.guard.js.map