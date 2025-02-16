import { rateLimit } from "express-rate-limit";

//Esto ayuda a dar limite a nuestras consultas
export const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: { error: "Has alcanzado el límite de peticiones" },
});
