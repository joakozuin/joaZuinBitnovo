import Axios from "axios"
import Global from '../../api/global'

const url = Global.url

const Service = {

    /* Crear dispositivo para comerciante. */
    postCreateDevice: async () => {
        try {
            const response = await Axios.post(`${url}device`, {}, {
                headers: {
                    "X-Device-Id": "53a86252-35cb-4fbe-9fe7-c4bfb72f23cc",
                    "Content-Type": "application/json"
                }
            });
    
            console.log("Estamos en Crear dispositivo para comerciante");
            console.log(response);
    
            return response;
        } catch (error) {
            console.error("Error al crear el dispositivo:", error);
            return null;
        }
    },
    

    


}

export default Service