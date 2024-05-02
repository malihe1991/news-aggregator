export const cleanParams = (params: any) => {
  for (const key of Object.keys(params)) {
    if (params[key] === '') {
      delete params[key];
    }
  }
  return params;
};
