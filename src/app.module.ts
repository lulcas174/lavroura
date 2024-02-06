import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProducerModule } from './rural-producer/rural-producer.module';
import { Producer } from './rural-producer/models/producer';

const configModule = ConfigModule.forRoot({
});

const databaseConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_CONFIG_HOST,
  port: parseInt(process.env.DB_CONFIG_PORT),
  username: process.env.DB_CONFIG_USERNAME ,
  password: process.env.DB_CONFIG_PASSWORD,
  database: process.env.DB_CONFIG_DATABASE,
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
});

@Module({
  imports: [
    configModule,
    databaseConfig,
    RuralProducerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
