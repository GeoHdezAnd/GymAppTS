import { transport } from "../config/nodemailer";

type EmailType = {
  nombre: string;
  email: string;
  token: string;
};

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "Gym App <admin@gymapp.com>",
      to: user.email,
      subject: "Gym APP - Confirmar cuenta",
      html: `
            <p>Hola: ${user.nombre}, has creado tu cuenta en GymApp, ya está casi lista </p>
            <p>Visita el siguiente enlace</p>
            <a href="${process.env.FRONTEND_URL}/auth/admin/confirm-account">Confirmar</a>
            <p>e ingresa el código: <b>${user.token}</b></p>
        `,
    });

    // console.log(email)
  };

  static sendPasswordReset = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: "Gym App <admin@gymapp.com>",
      to: user.email,
      subject: "Gym APP - Reestablecer contraseña",
      html: `
            <p>Hola: ${user.nombre}, has solicitado el cambio de tu contraseña </p>
            <p>Visita el siguiente enlace</p>
            <a href="${process.env.FRONTEND_URL}/auth/admin/new-password">Reestablecer contraseña</a>
            <p>e ingresa el código: <b>${user.token}</b></p>
            <b>Ignora este email si tú no solicitaste el cambio</b>
        `,
    });
  }
}
