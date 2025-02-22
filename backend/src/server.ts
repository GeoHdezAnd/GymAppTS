import express from "express";
import colors from "colors";
import morgan from "morgan";
import { db } from "./config/db";
import membershipRouter from "./routes/membershipRouter";
import authClientRouter from "./routes/authClientRouter";
import authAdminRouter from "./routes/authAdminRouter";
import shopMembershipRouter from "./routes/shopMembershipRouter";
import clientRouter from "./routes/clientRouter";
import attendanceRouter from "./routes/attendanceRouter";

async function connectDB() {
  try {
    await db.authenticate();
    // db.sync(); // ACTIVAR SI SE CREARAN NUEVAS TABLAS PERO CUIDADO PORQUE CREARA LA TABLA DE LA VISTA DE VENTAS, ESA TABLA NO DEBE EXISTIR COMO TABLA, ES UNA VISTA
    console.log(colors.blue.bold("Conexión exitosa a la BD"));
  } catch (error) {
    console.log(colors.red.bold("Falló la conexión a la BD"));
  }
}

connectDB();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth/client", authClientRouter);
app.use("/api/auth/admin", authAdminRouter);
app.use("/api/membership", membershipRouter);
app.use("/api/shop-membership/", shopMembershipRouter);
app.use("/api/client", clientRouter);
app.use("/api/attendance", attendanceRouter);

export default app;
