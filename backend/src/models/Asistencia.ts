import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Cliente } from "./Cliente";

@Table({
  tableName: "asistencia",
  timestamps: false,
  indexes: [
    { fields: ["cliente_id"] }, 
    { fields: ["fecha_asistencia"] }, 
  ],
})
export class Asistencia extends Model {
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATEONLY,
  })
  declare fecha_asistencia: string;

  @Default(DataType.NOW)
  @Column({
    type: DataType.TIME,
  })
  declare hora_entrada: string;

  @Default(null)
  @Column({
    type: DataType.TIME,
  })
  declare hora_salida: string;

  @ForeignKey(() => Cliente)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare cliente_id: number;

  @BelongsTo(() => Cliente)
  declare cliente: Cliente;
}
