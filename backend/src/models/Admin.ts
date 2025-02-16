import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  Unique,
  AllowNull,
} from "sequelize-typescript";

@Table({
  tableName: "admin",
})
export class Admin extends Model {
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
}
