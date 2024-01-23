"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const coffees_module_1 = require("./coffees/coffees.module");
const users_module_1 = require("./users/users.module");
const iam_module_1 = require("./iam/iam.module");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const music_module_1 = require("./music/music.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'musicFiles'),
                serveRoot: '/musicFiles'
            }),
            config_1.ConfigModule.forRoot(),
            coffees_module_1.CoffeesModule, users_module_1.UsersModule, iam_module_1.IamModule, typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'pass123',
                database: 'postgres',
                autoLoadEntities: true,
                synchronize: true
            }), iam_module_1.IamModule, music_module_1.MusicModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map