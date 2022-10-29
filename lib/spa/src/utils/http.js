export const isSuccessful = statusCode => {
    return statusCode >= 200 && statusCode < 300;
};

export const isError = statusCode => {
    return statusCode >= 400 && statusCode < 600;
};