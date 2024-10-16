import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Mesa } from '../../mesas/entities/mesa.entity';

@Entity()
export class Mesero {
  @PrimaryGeneratedColumn('uuid')
  idMesero: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @OneToMany(() => Mesa, (mesa) => mesa.idMesero, { cascade: true })
  idMesas: number[]; // Array de ID de mesas
}
