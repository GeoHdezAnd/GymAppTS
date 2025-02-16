import type { Request, Response } from "express";
import { Membresia } from "../models/Membresia";
import { Cliente } from "../models/Cliente";
import { VentasMembresia } from "../models/VentasMembresia";
import { VistaMembresiaCliente } from "../models/VistaMembresiaCliente";

export class ShopMembershipController {
  static getAll = async (req: Request, res: Response) => {
    try {
        const sales = await VistaMembresiaCliente.findAll();
        res.json(sales)
    } catch (error) {
        // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };

  static createSale = async (req: Request, res: Response) => {
    const { cliente_id, membresia_id } = req.body;
    try {
      const client = await Cliente.findByPk(cliente_id, {
        attributes: [
          "id",
          "nombre",
          "apellido_paterno",
          "apellido_materno",
          "matricula",
        ],
      });
      if (!client) {
        const error = new Error("El cliente no existe");
        res.status(404).json({ error: error.message });
        return;
      }

      const membership = await Membresia.findByPk(membresia_id, {
        attributes: ["id", "nombre", "precio", "duracion_dias"],
      });
      if (!membership) {
        const error = new Error("La membresia no existe");
        res.status(404).json({ error: error.message });
        return;
      }
      const dateToday = new Date();
      let fecha_expiracion = new Date(dateToday);
      fecha_expiracion.setDate(dateToday.getDate() + membership.duracion_dias);

      const saleData = {
        cliente_id: client.id,
        membresia_id: membership.id,
        fecha_expiracion,
        total: membership.precio,
      };

      const sale = new VentasMembresia(saleData);

      await sale.save();

      res.json({ msg: "Venta realizada correctamente" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };
}
