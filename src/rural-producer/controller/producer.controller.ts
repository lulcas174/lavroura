import { Controller, Get, Post, Body, Res, Param, Put, Req, Delete } from '@nestjs/common';
import { Producer } from '../models/producer';
import { ProducerService } from '../service/producer.service';
import { validateCPFAndCNPJPresence, ValidCPF, ValidCNPJ} from '../validators/cpf-cnpj.validators';
import { validateAreaTotalValues } from '../validators/area.validators';
import { validateRequestBody } from '../validators/validateRequest.validators';
import { ValidationException } from 'src/exceptions/validationException.exceptions';

@Controller('producer')
export class ProducerController {
    constructor(private readonly producerService: ProducerService) {
    }

    @Post('create')
    async create(@Body() reqBody: Producer, @Res() res, @Req() req) {
        try {
            validateRequestBody(reqBody, req.method);
            const producerCreated = await this.producerService.create(reqBody);
    
            if (producerCreated.status !== 'success') {
                return res.status(500).send(producerCreated.message);
            }
    
            return res.status(201).send(producerCreated);
        } catch (error) {
            console.error('Error creating producer:', error);
            return res.status(500).send(error.message);
        }
    }

    @Get('list')
    async list(@Res() res) {
        try {
            const producers = await this.producerService.list();
            return res.status(200).send(producers);
        } catch (error) {
            console.error('Error listing producers:', error);
            return res.status(500).send('Internal server error');
        }
    }

    @Get('find/:id')
    async getProducerById(@Res() res, @Param ('id') id) {
        try {
            const producer = await this.producerService.getProducerById(id);
            if (producer.status !== 'success') {
                return res.status(404).send(producer.message);
            }
            return res.status(200).send(producer);
        } catch (error) {
            console.error('Error finding producer:', error);
            return res.status(500).send('Internal server error');
        }
    }

    @Put('update/:id')
    async updateProducer(@Res() res, @Req() req,@Param('id') id, @Body() reqBody: Producer) {
        try {
            validateRequestBody(reqBody, req.method);
            const producerUpdated = await this.producerService.updateProducer(id, reqBody);
            return res.status(201).send(producerUpdated);
        } catch (error) {
            console.error('Error updating producer:', error);
            if (error instanceof ValidationException) {
                return res.status(400).send(error.message); 
            } else {
                return res.status(500).send(error.message);
            }
        }
    }

    @Delete('delete/:id')
    async deleteProducer(@Res() res, @Param('id') id) {
        try {
            const producerDeleted = await this.producerService.deleteProducer(id);
            if (producerDeleted.status !== 'success') {
                return res.status(404).send(producerDeleted.message);
            }
            return res.status(200).send(producerDeleted);
        } catch (error) {
            console.error('Error deleting producer:', error);
            return res.status(500).send('Internal server error');
        }
    }
}
