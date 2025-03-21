const errorMessageList = {
    400: "Bad request",
    401: "Anautorized",
    403: "Forbbiden",
    404: "Not found",
    409: "Conflict",


}
export const HttpError = (status, message = errorMessageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

