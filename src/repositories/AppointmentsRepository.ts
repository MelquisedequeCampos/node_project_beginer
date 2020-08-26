
// Every MODEL should have a REPOSITORY to read, edit, delete the MODEL


import { EntityRepository, Repository } from 'typeorm'

import Appointment from '../models/Appointments'


@EntityRepository(Appointment)

class AppointmentsRepository extends Repository<Appointment> { //"parametro de tipagem"

    public async findByDate(date: Date): Promise<Appointment | null> {

        const findAppointment = await this.findOne({ 
            where: { date }
        })

        return findAppointment || null
    }
}

export default AppointmentsRepository