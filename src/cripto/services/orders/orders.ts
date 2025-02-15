import Axios from "axios"
import Global from '../../api/global'

const url = Global.url

const Service = {
    /* Obtener la lista de órdenes */
    getOrderList: async () => {
        try {
            const response = await Axios.get(`${url}orders`, {
                headers: {
                    "X-Device-Id": "53a86252-35cb-4fbe-9fe7-c4bfb72f23cc",
                    "Content-Type": "application/json",
                  },
            });

            console.log("Estamos en getOrderList");
            console.log(response);

            return response;
        } catch (error) {
            console.error("Error al obtener la lista de órdenes:", error);
            return null;
        }
    },

    /* Crear una orden */
    /* postOrderCreate: async (data) => {
        try {
            const response = await Axios.post(`${url}orders`,data, {
                headers: {
                    "X-Device-Id": "53a86252-35cb-4fbe-9fe7-c4bfb72f23cc",
                    "Content-Type": "application/json",
                  },
            });

            console.log("Estamos en postOrderCreate");
            console.log(response);

            return response;
        } catch (error) {
            console.error("Error al crear la orden:", error);
            //return null;
        }
    },
 */
    /* Obtener información de una orden por ID */
    getOrderListRead: async (id: string) => {
        try {
            const response = await Axios.get(`${url}orders/info/${id}`, {
                headers: {
          "X-Device-Id": "53a86252-35cb-4fbe-9fe7-c4bfb72f23cc",
          "Content-Type": "application/json",
        },
            });

            console.log("Estamos en getOrderListRead");
            console.log(response);

            return response;
        } catch (error) {
            console.error(`Error al obtener la información de la orden con ID ${id}:`, error);
            return null;
        }
    },
};

export default Service;