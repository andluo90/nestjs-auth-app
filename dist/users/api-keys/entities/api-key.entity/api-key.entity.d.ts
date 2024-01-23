import { User } from "src/users/entities/user.entity";
export declare class ApiKey {
    id: number;
    key: string;
    uuid: string;
    user: User;
}
