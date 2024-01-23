import { AuthType } from "../enums/auth-type-enums";
export declare const AUTH_TYPE_KEY = "authType";
export declare const Auth: (...authType: AuthType[]) => import("@nestjs/common").CustomDecorator<string>;
