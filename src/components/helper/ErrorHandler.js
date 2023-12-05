export const errorHandler = (err) => {
  const customError = err?.response?.data?.message;
  const serverError = err?.response?.data?.error?.message;
  if (customError) return customError;
  else if (serverError) return serverError;
  else return "Oops! Something went wrong.";
};
