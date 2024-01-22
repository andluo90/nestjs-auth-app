import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { randomUUID } from 'crypto';

interface GenerateApiKeyPayload {
    apiKey:string
    hashedKey:string
}

@Injectable()
export class ApiKeysService {

    constructor(private readonly hashingService:HashingService){}

    async createAndHash(id:number):Promise<GenerateApiKeyPayload>{
        const apiKey = this.generateApiKey(id)
        const hashedKey = await this.hashingService.hash(apiKey)
        return {apiKey,hashedKey}
        
    }

    async validate(apiKey:string,hashedKey:string): Promise<boolean> {
        return await this.hashingService.compare(apiKey,hashedKey)
    }

    extracIdFromApiKey(apiKey:string):string{
        const [id] = Buffer.from(apiKey,'base64').toString('ascii').split(' ')
        return id
    }
    
    private generateApiKey(id:number):string{
        const apiKey = `${id} ${randomUUID()}`
        return Buffer.from(apiKey).toString('base64')
    }
}
