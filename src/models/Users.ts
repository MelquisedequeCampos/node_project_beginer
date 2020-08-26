import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
    
} from 'typeorm'

// @ Decorations: É como fosse um parametro para nossa classe
// - simbolisa que esse arquivo de 'Appointments'
// sera sempre salvo na tabela de 'Appointments' no Banco de Dados

@Entity('users') 

class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date

}

export default Users