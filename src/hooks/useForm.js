import { useState, useRef, useCallback } from "react";

function useForm(initialValues = {}) {
  const initialValuesRef = useRef(initialValues);
  const [values, setValues] = useState(() => ({
    ...initialValues,
  }));

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback((newValues) => {
    setValues({
      ...(newValues ?? initialValuesRef.current),
    });
  }, []);

  return { values, handleChange, resetForm };
}

export default useForm;
