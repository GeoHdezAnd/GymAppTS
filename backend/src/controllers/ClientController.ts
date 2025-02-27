import type { Request, Response } from "express";
import { Op } from "sequelize";
import { Cliente } from "../models/Cliente";
import { generateToken } from "../utils/token";
import { createMatricula, hashPassword } from "../utils/auth";
import { AuthEmail } from "../emails/EmailClient";
import { Asistencia } from "../models/Asistencia";

export class ClientController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const clients = await Cliente.findAll({
        where: {
          eliminado: false,
        },
        attributes: {
          exclude: ["password", "token", "confirmado", "eliminado"],
        },
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json(clients);
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrió un error" });
    }
  };
  static create = async (req: Request, res: Response) => {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      genero,
      fecha_nacimiento,
      email,
      telefono,
    } = req.body;
    try {
      const matricula: string = createMatricula(
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento
      );
      // Prevenir duplicados
      const clientExists = await Cliente.findOne({
        where: {
          [Op.or]: [{ email }, { telefono }, { matricula }],
        },
      });

      if (clientExists) {
        const error = new Error("El usuario ya existe");
        res.status(409).json({ error: error.message });
        return;
      }

      const client = new Cliente({
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        fecha_nacimiento,
        email,
        telefono,
        matricula,
      });

      client.password = await hashPassword(matricula);
      client.token = generateToken();

      await AuthEmail.sendConfirmationEmail({
        nombre: client.nombre,
        email: client.email,
        token: client.token,
      });

      const newClient = await client.save();
      res
        .status(201)
        .json(
          `Cliente registrado correctamente MATRICULA: ${newClient.matricula}`
        );
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    res.json(req.client);
  };

  static updateByID = async (req: Request, res: Response) => {
    try {
      const {
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        password,
        token,
      } = req.body;
      if (password || token) {
        const error = new Error("La el campo no se puede cambiar ");
        res.status(400).json({ error: error.message });
        return;
      }
      const matricula = createMatricula(
        nombre,
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento
      );
      req.body.matricula = matricula;
      await req.client.update(req.body);
      res.json("Cliente actualizado correctamente");
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Ocurrió un error" });
    }
  };

  static deleteByID = async (req: Request, res: Response) => {
    try {
      const eliminado = true;
      await req.client.update({
        eliminado,
      });
      res.json("Cliente eliminado");
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Ocurrió un error" });
    }
  };

  static getAttendances = async (req: Request, res: Response) => {
    const { clientID } = req.params;
    try {
      const attendances = await Asistencia.findAll({
        where: { cliente_id: clientID },
      });
      if (!attendances || attendances.length === 0) {
        const error = new Error("No hay asistencias");
        res.status(409).json({ error: error.message });
        return;
      }
      res.json(attendances);
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
  };
}
