import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointments'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

/*

    Objetivo de Services

    - Repassar os dados da requisição a outro arquivo
    - Devolver uma resposta.

                ***

    - Recebiemento de Informações
    - Tratativa de Erros e Execuções
    - Acesso ao Repositório
*/


interface RequestDTO {
    provider: string
    date: Date
}

class CreateAppointmentServices {

    // Dependency Invertion

    private appointmentsRepository: AppointmentsRepository

    constructor(appointmentsRepository: AppointmentsRepository) {

        this.appointmentsRepository = appointmentsRepository
    }


   public execute({ date, provider }: RequestDTO): Appointment { 
       
    const appointmentDate = startOfHour(date)
    
    const findAppointmentInTheSameDate = this.appointmentsRepository.findByDate(
        appointmentDate,
    )

    if(findAppointmentInTheSameDate) {
        throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({

        provider,
        date: appointmentDate
    })

     return appointment

    }
}

export default CreateAppointmentServices