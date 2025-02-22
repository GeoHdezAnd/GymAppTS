import { IoMdCloseCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { PiEraserFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import createMembership from "@/actions/admin/dashboard/memberships/create-membership-action";
import { toast } from "react-toastify";

type ModalTypes = {
  handleCloseModal: () => void;
};

type FormData = {
  nombre: string;
  duracion_dias: number | string;
  precio: number | string;
};

export default function CreateMembershipModal({
  handleCloseModal,
}: ModalTypes) {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    duracion_dias: "",
    precio: "",
  });

  const [benefits, setBenefits] = useState<string[]>([""]);

  const createMembershipWithBenefits = createMembership.bind(null, benefits);
  const [state, dispatch] = useActionState(createMembershipWithBenefits, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => handleCloseModal(),
        onClick: () => handleCloseModal(),
      });
    }
  }, [state, handleCloseModal]);

  // Add a new benefit input field
  const addInputField = () => {
    setBenefits([...benefits, ""]);
  };

  // Remove a benefit input field
  const removeInputField = (index: number) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(newBenefits);
  };

  // Handle changes in benefit inputs
  const handleBenefitsChange = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  // Handle changes in form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "precio" || name === "duracion_dias") {
      // Allow only numeric input (including decimals)
      if (/^\d*\.?\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg overflow-y-auto max-w-lg w-full">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg font-semibold">Nueva membresía</h3>
          <button
            onClick={handleCloseModal}
            className="text-red-600 text-2xl"
            aria-label="Cerrar modal"
          >
            <IoMdCloseCircle />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center my-auto w-full">
          <form
            className="grid p-4 m-2 border border-gray-800 rounded-md w-full shadow-lg"
            action={dispatch}
            noValidate
          >
            {/* Nombre Field */}
            <div className="mb-2">
              <label htmlFor="nombre" className="form-label">
                Nombre(s)
              </label>
              <input
                className="form-input"
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ingresa nombre"
              />
            </div>

            {/* Benefits Section */}
            <div className="w-full flex flex-col space-y-2">
              <div className="w-full flex flex-col p-[2px] min-h-0 max-h-60 overflow-y-auto space-y-2">
                <label htmlFor="beneficios" className="form-label">
                  Beneficios
                </label>
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) =>
                        handleBenefitsChange(index, e.target.value)
                      }
                      placeholder={`Beneficio ${index + 1}`}
                      className="form-input"
                    />
                    {benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInputField(index)}
                        className="btn-global"
                        aria-label="Eliminar beneficio"
                      >
                        <PiEraserFill />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Benefit Button */}
              <button
                type="button"
                onClick={addInputField}
                className="m-auto btn-global text-lg px-4 py-2 rounded"
                aria-label="Agregar beneficio"
              >
                <FaCirclePlus />
              </button>
            </div>

            {/* Duración Field */}
            <div className="mb-2">
              <label htmlFor="duracion_dias" className="form-label">
                Duración días
              </label>
              <input
                className="form-input"
                type="number"
                name="duracion_dias"
                id="duracion_dias"
                value={formData.duracion_dias}
                onChange={handleInputChange}
                placeholder="Ingresa duración en días"
              />
            </div>

            {/* Precio Field */}
            <div className="mb-2">
              <label htmlFor="precio" className="form-label">
                Precio
              </label>
              <input
                className="form-input"
                type="number"
                name="precio"
                id="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="Ingresa precio"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="mt-2 w-full btn-global">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
