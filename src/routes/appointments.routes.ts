import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentServices from '../services/CreateAppointmentServices'

const appointmentsRouter = Router()


// -------------------------------- get ------------------------------


appointmentsRouter.get('/', async (request, response) => { 

    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointment = await appointmentsRepository.find()

    return response.json(appointment)
 })


// -------------------------------- post ------------------------------


appointmentsRouter.post('/', async (request, response) => {

    try {
        const { provider_id, date } = request.body

        const parseDate = parseISO(date)

        const createAppointment = new CreateAppointmentServices()
    
        const appointment = await createAppointment.execute({
            date: parseDate,
            provider_id 
        })  
    
        return response.json(appointment) 
    
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
})

export default appointmentsRouter