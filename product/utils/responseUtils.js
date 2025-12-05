const createJsonResponse = (success, data, error = null) => {
    return { success, error, data };
}

module.exports = {
    createJsonResponse,
}