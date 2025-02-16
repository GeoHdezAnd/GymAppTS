import type { Request, Response } from "express";
import { Op } from "sequelize";
import { Cliente } from "../models/Cliente";
import { generateToken } from "../utils/token";
import { createMatricula, hashPassword } from "../utils/auth";
import { AuthEmail } from "../emails/Email";

export class ClientController {
  static create = async (req: Request, res: Response) => {
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
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
      res.status(201).json({ msg: "Cliente registrado correctamente indique que revise su correo" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };
}
