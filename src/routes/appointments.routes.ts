import { Router } from 'express'
import { parseISO } from 'date-fns'

import Appointment from '../models/Appointments'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentServices from '../services/CreateAppointmentServices'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository();

// -------------------------------- get ------------------------------


appointmentsRouter.get('/', (request, response) => { 

    const appointment = appointmentsRepository.all()

    return response.json(appointment)
 })


// -------------------------------- post ------------------------------


appointmentsRouter.post('/', (request, response) => {

    try {
        const { provider, date } = request.body

        const parseDate = parseISO(date)
    
        const createAppointment = new CreateAppointmentServices(
            appointmentsRepository
        )
    
        const appointment = createAppointment.execute({ date: parseDate, provider })  
    
        return response.json(appointment) 
    
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
})

export default appointmentsRouter