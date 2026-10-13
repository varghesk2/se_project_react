import { useState } from "react";

function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setValues({
      ...values,
      [name]: type === "radio" ? value : value,
    });
  };

 const resetForm = (newValues = initialValues) => {
  setValues(newValues);
};

  return { values, handleChange, resetForm };
}

export default useForm;
