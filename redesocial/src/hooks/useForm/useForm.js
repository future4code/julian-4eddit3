import { useState } from "react";

export const useForm = (InitialValues) => {
  const [form, setForm] = useState(InitialValues);

  const onChange = (name, value) => {
    const newForm = { ...form, [name]: value };
    setForm(newForm);
  };

  const resetForm = () => {
    setForm(InitialValues);
  };

  return { form, onChange, resetForm };
};
