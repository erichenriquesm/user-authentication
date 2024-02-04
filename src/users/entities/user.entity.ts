import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        unique: true
    })
    email:string

    @Column({
        type: 'text'
    })
    password: string

    @Column({
        type: 'date',
        nullable: true
    })
    email_verified_at: Date

    @CreateDateColumn()
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date
}
