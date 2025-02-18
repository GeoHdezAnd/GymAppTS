import type { Request, Response } from "express";
import { Asistencia } from "../models/Asistencia";
import { Cliente } from "../models/Cliente";
import { VistaUltimaMembresia } from "../models/VistaUltimaMembresia";

export class AttendanceController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const attendances = await Asistencia.findAll({
        include: [
          {
            model: Cliente,
            attributes: [
              "nombre",
              "apellido_paterno",
              "apellido_materno",
              "matricula",
              "telefono",
              "genero",
            ],
          },
        ],
      });

      res.json(attendances);
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servido" });
    }
  };

  static create = async (req: Request, res: Response) => {
    const { matricula } = req.body;
    try {
      const client = await Cliente.findOne({ where: { matricula } });
      if (!client) {
        const error = new Error("El cliente no existe");
        res.status(404).json({ error: error.message });
        return;
      }

      const membershipClient = await VistaUltimaMembresia.findOne({
        where: { cliente_id: client.id },
      });

      if (!membershipClient) {
        const error = new Error("El cliente no tiene membresia :(");
        res.status(404).json({ error: error.message });
        return;
      }

      if (
        membershipClient.estado == "vencida" ||
        membershipClient.estado == "renovada"
      ) {
        const error = new Error("La membresia del cliente está vencida :(");
        res.status(404).json({ error: error.message });
        return;
      }

      const attendance = new Asistencia({
        cliente_id: client.id,
      });
      await attendance.save();

      res.json({ msg: "Asistencia creada correctamente" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servido" });
    }
  };
}
