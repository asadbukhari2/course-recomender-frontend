export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  // let error = null

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    // error = 'Fill this field'
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    // error = 'Minimum Length'
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    // error = 'Maximum Length'
  }

  if (rules.isEmail) {
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    isValid = pattern.test(value) && isValid;
    // error = 'Enter correct Email'
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
    // error = 'Fill it with Numbers'
  }

  // return {isValid, error}
  return isValid;
};

export const InputChangeHandler = (event, inputIdentifier, formType) => {
  const updatedFormElement = updateObject(formType[inputIdentifier], {
    value: event.target.value,
    valid: checkValidity(
      event.target.value,
      formType[inputIdentifier].validation,
    ),
    touched: true,
  });

  const updatedForm = updateObject(formType, {
    [inputIdentifier]: updatedFormElement,
  });

  let formIsValid = true;
  for (let inputIdentifier in updatedForm) {
    formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
  }

  return { updatedForm, formIsValid };
};

export const formElements = (form) => {
  const formElementsArray = [];
  for (let key in form) {
    formElementsArray.push({
      id: key,
      config: form[key],
    });
  }

  return formElementsArray;
};
