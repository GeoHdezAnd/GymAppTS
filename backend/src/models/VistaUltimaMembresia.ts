import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "vista_ultima_membresia_cliente",
  timestamps: false,
})
export class VistaUltimaMembresia extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare venta_id: number;

  @Column({ type: DataType.DATE })
  declare fecha_compra: Date;

  @Column({ type: DataType.DATE })
  declare fecha_expiracion: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare fecha_renovacion: Date;

  @Column({ type: DataType.FLOAT })
  declare total: number;

  @Column({ type: DataType.INTEGER })
  declare cliente_id: number;

  @Column({ type: DataType.STRING })
  declare cliente_nombre: string;

  @Column({ type: DataType.STRING })
  declare cliente_email: string;

  @Column({ type: DataType.INTEGER })
  declare membresia_id: number;

  @Column({ type: DataType.STRING })
  declare membresia_nombre: string;

  @Column({ type: DataType.STRING })
  declare estado: string;
}
