import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
export declare class CoffeesService {
    create(createCoffeeDto: CreateCoffeeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCoffeeDto: UpdateCoffeeDto): string;
    remove(id: number): string;
}
