"use client";
import { useState } from "react";
import ValidateTokenNewPassForm from "./ValidateTokenNewPassForm";
import ResetPasswordForm from "./ResetPasswordForm";


export default function PasswordResetHandler() {
  const [tokenValid, setTokenValid] = useState(false);
  const [token, setToken] = useState("");
  return (
    <div>
      {!tokenValid ? (
        <ValidateTokenNewPassForm
          setTokenValid={setTokenValid}
          token={token}
          setToken={setToken}
        />
      ) : (
        <ResetPasswordForm token={token} />
      )}
    </div>
  );
}
