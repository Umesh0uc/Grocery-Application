const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;  

export const endpoints = {
    productsService: apiEndpoint + "/products",
    allProducts: apiEndpoint + "/products",
    cartService: apiEndpoint + "/cart",
    allCartItems: apiEndpoint + "/cart",
};