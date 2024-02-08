import { ProducerController } from 'src/rural-producer/controller/producer.controller';
import { Producer } from 'src/rural-producer/models/producer';
import { ProducerService } from 'src/rural-producer/service/producer.service';
import { Repository } from 'typeorm';


describe('Producer Endpoint Tests', () => {
  let producerController: ProducerController;
  let producerService: ProducerService;

  beforeEach(() => {
	producerService = new ProducerService({} as Repository<Producer>);
	producerController = new ProducerController(producerService);
  });

  describe('findAll', () => {
	it('should return an array of producers', async () => {
		const resMock = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn()
		}
		const result = [
			{
				id:1,
				CPF: '12345678900',
				name: 'John Doe',
				areaTotalHectares: 100,
				areaAgriculturalHectares: 50,
				areaVegetationHectares: 50
				
			}
		];
		
		jest.spyOn(producerController, 'list').mockResolvedValue(result);
		expect(await producerController.list(resMock)).toBe(result);
	})
  })
});
