import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "vista_membresia_cliente",
  timestamps: false, // No maneja createdAt ni updatedAt
})
export class VistaMembresiaCliente extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare venta_id: number;

  @Column({ type: DataType.DATE })
  declare fecha_compra: Date;

  @Column({ type: DataType.DATE })
  declare fecha_expiracion: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  declare fecha_renovacion: Date | null;

  @Column({ type: DataType.FLOAT })
  declare total: number;

  @Column({ type: DataType.INTEGER })
  declare cliente_id: number;

  @Column({ type: DataType.STRING(50) })
  declare cliente_nombre: string;

  @Column({ type: DataType.STRING(50) })
  declare cliente_email: string;

  @Column({ type: DataType.INTEGER })
  declare membresia_id: number;

  @Column({ type: DataType.STRING(50) })
  declare membresia_nombre: string;

  @Column({ type: DataType.STRING(10) })
  declare estado: string;
}
