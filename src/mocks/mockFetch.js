// success mock funtion
export const mockFetchSuccess = async (data) => {
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    const res = {
      ok: true,
      json: () => Promise.resolve(data)
    };
    return Promise.resolve(res);
  })
};

// failure mock function
export const mockFetchFailure = async (errorMessage, statusCode) => {
  jest.spyOn(global, 'fetch').mockImplementation(() => {
    const res = {
      ok: false
    };
    return Promise.resolve(res);
  })
};
