export const handleEmptyFields = (fields) => {
  
  let isEmpty = false;
  const emptyFields = fields.filter(
    (field) =>
      field.required &&
      (field.value instanceof Array
        ? field.value.length === 0
        : field.value instanceof Object
        ? field.value.value === ""
        : field.value === "")
  ).length;

  if (emptyFields) {
   
    isEmpty = true;
  }
  return isEmpty;
};
