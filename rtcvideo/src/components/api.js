import axios from "axios"

const host = 'http://localhost:3001/'

export const apiService = {
    hlsConnectQuery: async (id) => {
        try {
            const response = await axios.get(`${host}id/${id}`)
            return {
                data: response.data,
                success: true
            }
        } catch (error) {
            console.log(error)
        }
    },
    paginationQueryData: async (data) => {
        try {
            const response = await axios.get(`${host}camera/filtAndPAg`, data)
            return response.data
        } catch (error) {
            console.log(error)            
        }
    }
    
}