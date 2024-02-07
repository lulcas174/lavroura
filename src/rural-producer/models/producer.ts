import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum CropsPlantedEnum {
    SOJA = 'Soja',
    MILHO = 'Milho',
    ALGODAO = 'Algodão',
    CAFE = 'Café',
    CANA_DE_ACUCAR = 'Cana de Açúcar',
}

@Entity('producer')
export class Producer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    CPF: string;

    @Column({ unique: true, nullable: true })
    CNPJ: string;

    @Column({ unique: true})
    nameProducer: string;

    @Column()
    nameFarm: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    areaTotalHectares: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    areaAgriculturalHectares: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    areaVegetationHectares: number;

    @Column({
        type: 'enum',
        enum: CropsPlantedEnum,
        array: true,
        nullable: true,
    })
    culturasPlantadas?: CropsPlantedEnum[];
}