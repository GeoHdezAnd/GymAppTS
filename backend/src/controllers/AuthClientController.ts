import type { Request, Response } from "express";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import { Cliente } from "../models/Cliente";
import { checkPassword, createMatricula, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/Email";
import { generateJWT } from "../utils/jwt";

export class AuthClientController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const clients = await Cliente.findAll({
        where: {
          eliminado: "false",
        },
      });
      res.status(200).json(clients);
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Ocurrio un error" });
    }
  };
  static create = async (req: Request, res: Response) => {
    try {
      const {
        nombre,
        apellido_paterno,
        apellido_materno,
        genero,
        email,
        telefono,
        password,
        fecha_nacimiento,
      } = req.body;

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
        email,
        telefono,
        fecha_nacimiento,
        matricula,
        password,
      });
      client.password = await hashPassword(password);
      client.token = generateToken();

      await AuthEmail.sendConfirmationEmail({
        nombre: client.nombre,
        email: client.email,
        token: client.token,
      });

      await client.save();
      res
        .status(201)
        .json({ msg: "Registrado correctamente revise su correo" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };

  static confirmAccountClient = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const user = await Cliente.findOne({
        where: { token },
      });

      if (!user) {
        const error = new Error("El token no existe");
        res.status(409).json({ error: error.message });
        return;
      }
      user.confirmado = true;
      user.token = null;

      await user.save();

      res.json({ msg: "Cuenta confirmada correctamente" });
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      // Revisa si el usuario existe
      const user = await Cliente.findOne({ where: { email } });
      if (!user) {
        const error = new Error("Usuario no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }
      if (!user.confirmado) {
        const error = new Error("Cuenta no confirmada");
        res.status(403).json({ error: error.message }); // 403: FORBIDDEN
        return;
      }

      const isPasswordCorrect = await checkPassword(password, user.password);
      if (!isPasswordCorrect) {
        const error = new Error("La contraseña no coincide");
        res.status(401).json({ error: error.message }); // 401: UNAUTHORIZED
        return;
      }
      const token = generateJWT(user.id);
      res.json(token);
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      const user = await Cliente.findOne({ where: { email } });
      if (!user) {
        const error = new Error("El usuario no existe");
        res.status(409).json({ error: error.message });
        return;
      }

      if (!user.confirmado) {
        const error = new Error("El usuario no ha sido confirmado");
        res.status(409).json({ error: error.message });
        return;
      }

      user.token = generateToken();
      await user.save();

      await AuthEmail.sendPasswordReset({
        nombre: user.nombre,
        email: user.email,
        token: user.token,
      });
      res.json({ msg: "Se le envio un correo con instrucciones" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un problema en el servidor" });
    }
  };

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
      const user = await Cliente.findOne({ where: { token } });
      if (!user) {
        const error = new Error("Token no valido");
        res.status(409).json({ error: error.message });
        return;
      }

      if (!user.confirmado) {
        const error = new Error("El usuario no ha sido confirmado");
        res.status(409).json({ error: error.message });
        return;
      }
      res.json("Token valido");
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un problema en el servidor" });
    }
  };

  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const user = await Cliente.findOne({ where: { token } });
      if (!user) {
        const error = new Error("Token no existe");
        res.status(409).json({ msg: error.message });
        return;
      }
      // asignar nuevo password
      user.password = await hashPassword(password);
      user.token = null;

      await user.save();

      res.status(200).json({ msg: "Contraseña modificada correctamente" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };

  static client = async (req: Request, res: Response) => {
    res.json(req.client);
  };

  static updateCurrentUserPassword = async (req: Request, res: Response) => {
    const { current_password, password } = req.body;
    const { id } = req.client;
    try {
      const user = await Cliente.findByPk(id);
      const isPasswordCorrect = await checkPassword(
        current_password,
        user.password
      );
      if (!isPasswordCorrect) {
        const error = new Error("Contraseña no coincide");
        res.status(401).json({ msg: error.message });
        return;
      }
      user.password = await hashPassword(password);

      await user.save();
      res.json({ msg: "Contraseña modificada correctamente" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };

  static checkPassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    const { id } = req.client;
    try {
      const user = await Cliente.findByPk(id);
      const isPasswordCorrect = await checkPassword(password, user.password);
      if (!isPasswordCorrect) {
        const error = new Error("Contraseña no coincide");
        res.status(401).json({ msg: error.message });
        return;
      }
      res.json({ msg: "Contraseña correcta" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrio un error en el servidor" });
    }
  };
}
