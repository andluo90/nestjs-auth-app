import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
export declare class CoffeesController {
    private readonly coffeesService;
    constructor(coffeesService: CoffeesService);
    create(createCoffeeDto: CreateCoffeeDto): string;
    findAll(user: ActiveUserData): string;
    findOne(id: string): string;
    update(id: string, updateCoffeeDto: UpdateCoffeeDto): string;
    remove(id: string): string;
}
