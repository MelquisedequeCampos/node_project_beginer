
// Every MODEL should have a REPOSITORY to read, edit, delete the MODEL

import { isEqual } from 'date-fns'
import Appointment from '../models/Appointments'

// DTO: Data Tranfer Object

interface CreateAppointmentDTO {
    
    provider: string,
    date: Date
}


class AppointmentsRepository {
    private Appointments: Appointment[]

    constructor() {
        this.Appointments= []
    }

    public all() {
        return this.Appointments
    }

    public findByDate(date: Date): Appointment | null {

        const findAppointment= this.Appointments.find(appointment => 
            isEqual(date, appointment.date)
        )
        
        return findAppointment || null
    }

    public create({ provider, date }: CreateAppointmentDTO ): Appointment {

    const appointment = new Appointment({provider, date})
    
    this.Appointments.push(appointment)

    return appointment

    }
}

export default AppointmentsRepository