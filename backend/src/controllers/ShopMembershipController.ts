import type { Request, Response } from "express";
import { Membresia } from "../models/Membresia";
import { Cliente } from "../models/Cliente";
import { VentasMembresia } from "../models/VentasMembresia";
import { VistaMembresiaCliente } from "../models/VistaMembresiaCliente";
import { VistaUltimaMembresia } from "../models/VistaUltimaMembresia";

export class ShopMembershipController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const sales = await VistaMembresiaCliente.findAll();
      res.json(sales);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };

  static getLastMemership = async (req: Request, res: Response) => {
    try {
      const memberships = await VistaUltimaMembresia.findAll();
      res.json(memberships);
    } catch (error) {
      console.log(error);
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

      const lastMembership = await VistaUltimaMembresia.findOne({
        where: {
          cliente_id: cliente_id,
        },
      });

      if (lastMembership) {
        // Si hay membresia activa se detiene
        if (lastMembership.estado === "activa") {
          const error = new Error(
            `Ya hay membresia activa con el tipo "${lastMembership.membresia_nombre}" `
          );
          res.status(404).json({ error: error.message });
          return;
        }

        // Revisa si la ultima compra tiene la misma membresia que se quiere comprar
        if (
          lastMembership.membresia_id == membership.id &&
          lastMembership.estado == "expirada"
        ) {
          // Se renueva la membresia pasada
          const lastSale = await VentasMembresia.findByPk(
            lastMembership.venta_id
          );
          lastSale.fecha_renovacion = dateToday;
          await lastSale.save();

          // Se crea una nueva venta
          const newSale = {
            cliente_id: client.id,
            membresia_id: membership.id,
            fecha_expiracion,
            total: membership.precio,
          };

          const sale = new VentasMembresia(newSale);

          await sale.save();
          res.json("Membresia renovada");
          return;
        }
      }

      const saleData = {
        cliente_id: client.id,
        membresia_id: membership.id,
        fecha_expiracion,
        total: membership.precio,
      };

      const sale = new VentasMembresia(saleData);

      await sale.save();

      res.json("Venta realizada correctamente con nueva membresia");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };

  static delete = async (req: Request, res: Response) => {
    const { saleID } = req.params;
    try {
      const saleExists = await VentasMembresia.findByPk(saleID);
      if (!saleExists) {
        const error = new Error("La venta no existe");
        res.status(404).json({ error: error.message });
        return;
      }
      const dateSale = new Date(saleExists.fecha_compra);
      const today = new Date();

      const isToday =
        dateSale.getFullYear() === today.getFullYear() &&
        dateSale.getMonth() === today.getMonth() &&
        dateSale.getDate() === today.getDate();

      // Si la venta se realizo hoy y fue hace más de 30 minutos no se permite la operación
      if (isToday) {
        const differenceMilliSec = today.getTime() - dateSale.getTime();
        const differenceMinutes = differenceMilliSec / (1000 * 60);
        if (differenceMinutes >= 30) {
          const error = new Error(
            "La venta de membresia no se puede eliminar porque se realizo hace más de 30 minutos"
          );
          res.status(405).json({ error: error.message });
          return;
        }
      }

      await saleExists.destroy();

      res.json({ msg: "Venta de membresia eliminada" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };
}
