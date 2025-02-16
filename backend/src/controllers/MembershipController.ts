import type { Request, Response } from "express";
import { Membresia } from "../models/Membresia";

export class MembershipController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const memberships = await Membresia.findAll({
        order: [["precio", "ASC"]],
      });
      res.status(200).json(memberships);
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "Ocurrió un error" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const membership = new Membresia(req.body);
      await membership.save();
      res.status(201).json({ msg: "Membresia creada correctamente" });
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Ocurrió un error" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    res.json(req.membership);
  };

  static updateById = async (req: Request, res: Response) => {
    try {
      await req.membership.update(req.body);
      res.json({ msg: "Membresia actualizada correctamente" });
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Ocurrió un error" });
    }
  };

  static deleteById = async (req: Request, res: Response) => {
    try {
      const eliminado = true;
      await req.membership.update({
        eliminado,
      });
      res.status(201).json({msg: 'Membresia eliminada'});
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: "Ocurrió un error" });
    }
  };
}
