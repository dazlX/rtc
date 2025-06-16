import axios from "axios";

const host = 'http://localhost:3001/'

export const apiService ={

    //==============   EditPanel

    editPanelGetInfo: async (id) => {
        try {
            const res = await axios.get(`${host}camera/${id}`)
            console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    },
    
    editPanelUpdateInfo: async (id, info) => {
        try {
            await axios.patch(`${host}camera/${id}`, info)
            return true
      
        } catch (error) {
            console.log(error)
        }
    },

    editPanelDeleteInfo: async (id) => {
        try {
            await axios.delete(`${host}camera/${id}`)
            return true
        } catch (error) {
            console.log(error)
        }
    }, 
    hlsConnectQuery: async (id) => {
        try {
            const response = await axios.get(`${host}id/${id}`)
            return {
                data: response.data,
                success: true
            }
        }
        catch (error) {
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