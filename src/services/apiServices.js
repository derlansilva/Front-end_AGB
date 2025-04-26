import api from "./api";

const apiServices = {
    getManifestActive: async () => {
        const response = await api.get('/manifest/active');

        return response.data;
    },

    getManifestById: async (id) => {
        const response = await api.get(`/manifest/${id}`);

        return response.data;
    },

    createManifest: async (manifest) => {
        const response = await api.post('/manifest/create', manifest);

        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`/product/${id}`)

        return response.data;
    },

    uploadExcel: async (file) => {
        const formData = new FormData();
        formData.append("file", file); // "file" é o nome que o backend espera

        const response = await api.post("/order/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    }

}



export default apiServices;