import type { Request, Response } from "express";
import { Op } from "sequelize";
import { Cliente } from "../models/Cliente";
import { generateToken } from "../utils/token";
import { createMatricula, hashPassword } from "../utils/auth";
import { AuthEmail } from "../emails/Email";

export class ClientController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const clients = await Cliente.findAll({
        where: {
          eliminado: false,
        },
        attributes: {
          exclude: ["password", "token"],
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

      await client.save();
      res.status(201).json({
        msg: "Cliente registrado correctamente indique que revise su correo",
      });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };

  static getByID = async (req: Request, res: Response) => {
    res.json(req.client);
  };

  static updateByID = async (req: Request, res: Response) => {
    try {
      const { password, token } = req.body;
      if (password || token) {
        const error = new Error("La el campo no se puede cambiar ");
        res.status(400).json({ error: error.message });
        return;
      }
      await req.client.update(req.body);
      res.json({ msg: "Cliente actualizado correctamente" });
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
      res.status(201).json({ msg: "Cliente eliminado" });
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Ocurrió un error" });
    }
  };
}
