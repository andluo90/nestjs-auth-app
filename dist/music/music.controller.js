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
exports.MusicController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../iam/authentication/decorators/auth.decorator");
const auth_type_enums_1 = require("../iam/authentication/enums/auth-type-enums");
const music_service_1 = require("./music.service");
let MusicController = class MusicController {
    constructor(musicService) {
        this.musicService = musicService;
    }
    findAll() {
        return this.musicService.findAll();
    }
};
exports.MusicController = MusicController;
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enums_1.AuthType.None),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "findAll", null);
exports.MusicController = MusicController = __decorate([
    (0, common_1.Controller)('music'),
    __metadata("design:paramtypes", [music_service_1.MusicService])
], MusicController);
//# sourceMappingURL=music.controller.js.map