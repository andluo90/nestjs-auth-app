import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ApiKeysService } from '../../api-keys.service';
import { Repository } from 'typeorm';
import { ApiKey } from 'src/users/api-keys/entities/api-key.entity/api-key.entity';
export declare class ApiKeyGuard implements CanActivate {
    private readonly apiKeyService;
    private readonly apiKeyRepository;
    constructor(apiKeyService: ApiKeysService, apiKeyRepository: Repository<ApiKey>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractKeyFromHeader;
}
