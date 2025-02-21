"use client";
import { useState } from "react";
import ValidateTokenNewPassForm from "./ValidateTokenNewPassForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function PasswordResetHandler() {
  const [tokenValid, setTokenValid] = useState(false);

  return (
    <div>
      {!tokenValid ? <ValidateTokenNewPassForm setTokenValid={setTokenValid} /> : <ResetPasswordForm />}
    </div>
  );
}
