export const convertAsStringOfExceptionMessages = (error) => {
  if (error.response.data.errors.length > 1) {
    return error.response.data.errors.join("\n");
  } else {
    return error.response.data.errors[0];
  }
};
