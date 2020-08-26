import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

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
    provider_id: any
    date: Date
}

class CreateAppointmentServices {

   public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> { 
    
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        appointmentDate,
    )

    if(findAppointmentInSameDate) {
        throw Error(' This appointment is already booked ')
    }

    const appointment = appointmentsRepository.create({
        provider_id,
        date: appointmentDate
    })

    // salvando no Banco de Dados
    await appointmentsRepository.save(appointment)

     return appointment

    }
}

export default CreateAppointmentServices