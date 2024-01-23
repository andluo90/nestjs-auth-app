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
exports.CoffeesController = void 0;
const common_1 = require("@nestjs/common");
const coffees_service_1 = require("./coffees.service");
const create_coffee_dto_1 = require("./dto/create-coffee.dto");
const update_coffee_dto_1 = require("./dto/update-coffee.dto");
const active_user_decorator_1 = require("../iam/decorators/active-user-decorator");
const roles_decorator_1 = require("../iam/authorization/decorators/roles.decorator");
const role_enums_1 = require("../users/enums/role.enums");
const auth_decorator_1 = require("../iam/authentication/decorators/auth.decorator");
const auth_type_enums_1 = require("../iam/authentication/enums/auth-type-enums");
let CoffeesController = class CoffeesController {
    constructor(coffeesService) {
        this.coffeesService = coffeesService;
    }
    create(createCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
    }
    findAll(user) {
        console.log(user);
        return this.coffeesService.findAll();
    }
    findOne(id) {
        return this.coffeesService.findOne(+id);
    }
    update(id, updateCoffeeDto) {
        return this.coffeesService.update(+id, updateCoffeeDto);
    }
    remove(id) {
        return this.coffeesService.remove(+id);
    }
};
exports.CoffeesController = CoffeesController;
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enums_1.AuthType.ApiKey),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coffee_dto_1.CreateCoffeeDto]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, active_user_decorator_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "findAll", null);
__decorate([
    (0, auth_decorator_1.Auth)(auth_type_enums_1.AuthType.None),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enums_1.Role.Admin),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coffee_dto_1.UpdateCoffeeDto]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enums_1.Role.Admin),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoffeesController.prototype, "remove", null);
exports.CoffeesController = CoffeesController = __decorate([
    (0, common_1.Controller)('coffees'),
    __metadata("design:paramtypes", [coffees_service_1.CoffeesService])
], CoffeesController);
//# sourceMappingURL=coffees.controller.js.map