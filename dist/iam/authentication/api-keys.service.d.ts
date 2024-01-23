import { HashingService } from '../hashing/hashing.service';
interface GenerateApiKeyPayload {
    apiKey: string;
    hashedKey: string;
}
export declare class ApiKeysService {
    private readonly hashingService;
    constructor(hashingService: HashingService);
    createAndHash(id: number): Promise<GenerateApiKeyPayload>;
    validate(apiKey: string, hashedKey: string): Promise<boolean>;
    extracIdFromApiKey(apiKey: string): string;
    private generateApiKey;
}
export {};
