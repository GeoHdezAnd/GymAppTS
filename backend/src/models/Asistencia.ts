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
})
export class Asistencia extends Model {
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
  })
  declare fecha_asistencia: Date;

  @ForeignKey(() => Cliente)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare cliente_id: number;

  @BelongsTo(() => Cliente)
  declare cliente: Cliente;
}
