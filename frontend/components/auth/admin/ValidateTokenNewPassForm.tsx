
import validateToken from "@/actions/admin/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import {
  startTransition,
  useActionState,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "react-toastify";

type ValidateTokenFromProps = {
  setTokenValid: Dispatch<SetStateAction<boolean>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

export default function ValidateTokenNewPassForm({
  setTokenValid,
  token,
  setToken,
}: ValidateTokenFromProps) {
  const [isComplete, setIsComplete] = useState(false);
  const validateTokenInput = validateToken.bind(null, token);
  const [state, dispatch] = useActionState(validateTokenInput, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (isComplete) {
      startTransition(() => {
        dispatch(); // Despacha la acción dentro de startTransition
      });
    }
  }, [isComplete]);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success);
      setTokenValid(true);
    }
  }, [state, setTokenValid]);

  const toggleToken = (token: string) => {
    setIsComplete(false);
    setToken(token);
  };
  const handleComplete = () => {
    setIsComplete(true);
  };
  return (
    <>
      <div className="flex  justify-center items-center gap-5 my-8 ">
        <PinInput
          value={token}
          onChange={toggleToken}
          onComplete={handleComplete}
        >
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
          <PinInputField className="h-10 w-10 border border-gray-800 shadow-md rounded-lg text-center placeholder-white" />
        </PinInput>
      </div>
    </>
  );
}
