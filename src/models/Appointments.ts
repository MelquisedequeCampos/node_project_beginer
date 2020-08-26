
import {
     Entity,
     Column,
     PrimaryGeneratedColumn,
     CreateDateColumn,
     UpdateDateColumn,
     ManyToOne,
     JoinColumn 
} from 'typeorm'

import User from './Users'

// @ Decorations: É como fosse um parametro para nossa classe
// - simbolisa que esse arquivo de 'Appointments'
// sera sempre salvo na tabela de 'Appointments' no Banco de Dados


@Entity('appointments') 
class Appointment {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider_id: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User

    @Column('timestamp with time zone')
    date: Date

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    update_at: Date
}

export default Appointment