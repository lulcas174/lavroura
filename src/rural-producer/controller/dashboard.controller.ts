import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from '../service/dashboard.service';

@ApiTags('producer/dashboard')
@Controller('producer/dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('list/farms')
    async listFarms(@Res() res) {
        try {
            const farms = await this.dashboardService.listFarms();
            return res.status(200).send(farms);
        }catch(error) {
            console.error('Error listing farms:', error);
            return res.status(500).send('Internal server error');
        }
    }

    @Get('list/farm/hectares')
    async listFarmHectares(@Res() res) {
        try {
            const hectares = await this.dashboardService.listFarmHectares();
            return res.status(200).send(hectares);
        }catch(error) {
            console.error('Error listing hectares:', error);
            return res.status(500).send('Internal server error');
        }
    }

    @Get('list/total/states')
    async totalStates(@Res() res, @Query('state') state?: string) {
        try {
            const states = await this.dashboardService.totalStates(state);
            return res.status(200).send(states);
        } catch(error) {
            console.error('Error listing states:', error);
            return res.status(500).send('Internal server error');
        }
    }

    @Get('list/total/cultures')
    async totalCultures(@Res() res) {
        try {
            const cultures = await this.dashboardService.totalCultures();
            return res.status(200).send(cultures);
        } catch(error) {
            console.error('Error listing cultures:', error);
            return res.status(500).send('Internal server error');
        }
    }

    @Get('list/total/used-solo')
    async totalCulturesPlanted(@Res() res) {
        try {
            const cultures = await this.dashboardService.useSoloHectares();
            return res.status(200).send(cultures);
        } catch(error) {
            console.error('Error listing cultures:', error);
            return res.status(500).send('Internal server error');
        }
    }
}