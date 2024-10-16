import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mesa {
  @PrimaryGeneratedColumn()
  idMesa: number;

  @Column({ type: 'text' })
  tamanoMesa: string;

  @Column('float')
  totalCuenta: number;

  @Column('int', { array: true, default: [] }) // Para almacenar el array de productos
  idProducto: number[];

  @Column({ nullable: true })
  idMesero: string; // idMesero como referencia al mesero
}
