import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Cliente } from "./Cliente";
import { Membresia } from "./Membresia";

@Table({
  tableName: "ventas_membresia",
})
export class VentasMembresia extends Model {
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
  })
  declare fecha_compra: Date;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  declare fecha_expiracion: Date;

  @Default(null)
  @Column({
    type: DataType.DATE,
  })
  declare fecha_renovacion: Date;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare total: number;

  // Relacion n .....  1
  @ForeignKey(() => Cliente)
  @Column({
    type: DataType.INTEGER,
  })
  declare cliente_id: number;

  @BelongsTo(() => Cliente)
  declare cliente: Cliente;

  @ForeignKey(() => Membresia)
  @Column({
    type: DataType.INTEGER,
  })
  declare membresia_id: number;
  @BelongsTo(() => Membresia)
  declare membresia: Membresia;
}
