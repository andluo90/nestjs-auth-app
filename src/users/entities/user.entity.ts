import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { Role } from '../enums/role.enums';
import { ApiKey } from '../api-keys/entities/api-key.entity/api-key.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({enum:Role,default:Role.Regular})
    role:Role

    @JoinTable()
    @OneToMany((type)=>ApiKey,(apiKey)=>apiKey.user)
    apiKey:ApiKey[]
}
