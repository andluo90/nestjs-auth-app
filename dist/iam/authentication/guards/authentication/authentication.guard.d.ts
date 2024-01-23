import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { ApiKeyGuard } from '../api-key/api-key.guard';
export declare class AuthenticationGuard implements CanActivate {
    private readonly reflector;
    private readonly accessTokenGuard;
    private readonly apiKeyGuard;
    private static readonly defaultAuthType;
    private readonly authTypeGuardMap;
    constructor(reflector: Reflector, accessTokenGuard: AccessTokenGuard, apiKeyGuard: ApiKeyGuard);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
