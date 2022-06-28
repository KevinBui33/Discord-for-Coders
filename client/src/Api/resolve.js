export async function resolve(promise) {
  const resolved = {
    data: null,
    error: null,
  };

  await promise
    .then((res) => (resolved.data = res.data))
    .catch((err) => (resolved.error = err.response.data));

  return resolved;
}
