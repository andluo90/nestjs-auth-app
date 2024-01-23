import { Role } from '../enums/role.enums';
import { ApiKey } from '../api-keys/entities/api-key.entity/api-key.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    role: Role;
    apiKey: ApiKey[];
}
