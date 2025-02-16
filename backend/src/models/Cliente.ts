import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  Unique,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import { VentasMembresia } from "./VentasMembresia";

@Table({
  tableName: "cliente",
})
export class Cliente extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare nombre: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare apellido_paterno: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare apellido_materno: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING(1),
  })
  declare genero: string;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(50),
  })
  declare email: string;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(10),
  })
  declare telefono: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY,
  })
  declare fecha_nacimiento: string;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(10),
  })
  declare matricula: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare password: string;

  @Default(null)
  @Column({
    type: DataType.STRING(6),
  })
  declare token: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare confirmado: boolean;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare eliminado: boolean;

  @HasMany(() => VentasMembresia, {
    onUpdate: "SET NULL",
    onDelete: "CASCADE",
  })
  declare ventas_membresia: VentasMembresia[];
}
