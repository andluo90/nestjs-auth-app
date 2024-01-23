"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
let CoffeesService = class CoffeesService {
    create(createCoffeeDto) {
        return 'This action adds a new coffee';
    }
    findAll() {
        return `This action returns all coffees`;
    }
    findOne(id) {
        return `This action returns a #${id} coffee`;
    }
    update(id, updateCoffeeDto) {
        return `This action updates a #${id} coffee`;
    }
    remove(id) {
        return `This action removes a #${id} coffee`;
    }
};
exports.CoffeesService = CoffeesService;
exports.CoffeesService = CoffeesService = __decorate([
    (0, common_1.Injectable)()
], CoffeesService);
//# sourceMappingURL=coffees.service.js.map