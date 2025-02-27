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
      // Find the client by matricula
      const client = await Cliente.findOne({ where: { matricula } });
      if (!client) {
        res.status(404).json({ error: "El cliente no existe" });
        return;
      }

      // Check if the client has an active membership
      const membershipClient = await VistaUltimaMembresia.findOne({
        where: { cliente_id: client.id },
      });

      if (!membershipClient) {
        res.status(404).json({ error: "El cliente no tiene membresia :(" });
        return;
      }

      if (
        membershipClient.estado !== "activa"
      ) {
        res
          .status(404)
          .json({ error: "La membresia del cliente está vencida :(" });
        return;
      }

      // Get today's date in DATEONLY format
      const today = new Date();
      const todayDateOnly = new Date(today.toISOString().split("T")[0]); // Extract date part only

      // Check if the client already has an attendance record for today
      const existingAttendance = await Asistencia.findOne({
        where: {
          cliente_id: client.id,
          fecha_asistencia: todayDateOnly,
        },
      });

      if (existingAttendance) {
        // If attendance exists and hora_salida is null, update hora_salida
        if (!existingAttendance.hora_salida) {
          existingAttendance.hora_salida = new Date().toTimeString().split(' ')[0]; // Set hora_salida to current time
          await existingAttendance.save();
          res.json("Hora de salida registrada correctamente");
          return;
        } else {
          // If attendance exists and hora_salida is already set, return an error
          res.status(400).json({ error: "Ya asistió el día de hoy" });
          return;
        }
      } else {
        // If no attendance exists for today, create a new one
        const attendance = await Asistencia.create({
          cliente_id: client.id,
          fecha_asistencia: todayDateOnly,
          hora_entrada: new Date().toTimeString().split(' ')[0], // Set hora_entrada to current time
        });
        res.json("Asistencia creada correctamente");
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ocurrió un error en el servidor" });
      return;
    }
  };
}
