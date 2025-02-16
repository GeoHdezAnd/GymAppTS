import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

export const db = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password:  process.env.DATABASE_PASSWORD,
  host:  process.env.DATABASE_HOST,
  port:  parseInt(process.env.DATABASE_PORT, 10),
  dialect: "postgres",
  models: [__dirname + "/../models/**/*"],
  logging: false,
});
