export const getPriceQueryParams = (
  queryParams: URLSearchParams,
  key: string,
  value: string
): URLSearchParams => {
  const hasValueInParam = queryParams.has(key);

  if (value !== "" && hasValueInParam) {
    queryParams.set(key, value.toString());
  } else if (value !== "") {
    queryParams.append(key, value.toString());
  } else if (hasValueInParam) {
    queryParams.delete(key);
  }

  return queryParams;
};
