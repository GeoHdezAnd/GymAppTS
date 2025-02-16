import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  HasMany,
} from "sequelize-typescript";
import { VentasMembresia } from "./VentasMembresia";

@Table({
  tableName: "membresia",
})
export class Membresia extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare nombre: string;

  @Default([])
  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  declare beneficios: string[];

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare duracion_dias: number;

  @AllowNull(false)
  @Column({
    type: DataType.DOUBLE,
  })
  declare precio: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare eliminado: boolean;

  // Relación 1 .... n
  @HasMany(() => VentasMembresia, {
    onUpdate: "SET NULL",
    onDelete: "CASCADE",
  })
  declare ventas_membresia: VentasMembresia[];
}
