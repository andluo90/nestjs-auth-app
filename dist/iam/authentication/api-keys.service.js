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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeysService = void 0;
const common_1 = require("@nestjs/common");
const hashing_service_1 = require("../hashing/hashing.service");
const crypto_1 = require("crypto");
let ApiKeysService = class ApiKeysService {
    constructor(hashingService) {
        this.hashingService = hashingService;
    }
    async createAndHash(id) {
        const apiKey = this.generateApiKey(id);
        const hashedKey = await this.hashingService.hash(apiKey);
        return { apiKey, hashedKey };
    }
    async validate(apiKey, hashedKey) {
        return await this.hashingService.compare(apiKey, hashedKey);
    }
    extracIdFromApiKey(apiKey) {
        const [id] = Buffer.from(apiKey, 'base64').toString('ascii').split(' ');
        return id;
    }
    generateApiKey(id) {
        const apiKey = `${id} ${(0, crypto_1.randomUUID)()}`;
        return Buffer.from(apiKey).toString('base64');
    }
};
exports.ApiKeysService = ApiKeysService;
exports.ApiKeysService = ApiKeysService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hashing_service_1.HashingService])
], ApiKeysService);
//# sourceMappingURL=api-keys.service.js.map