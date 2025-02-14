import Axios from "axios";
import Global from "../../api/global";

const url = Global.url;

const Service = {
  /* Obtenemos todas las monedas */
  getListCurrency: async () => {
    try {
      const response = await Axios.get(`${url}currencies`, {
        headers: {
          "X-Device-Id": "53a86252-35cb-4fbe-9fe7-c4bfb72f23cc",
          "Content-Type": "application/json",
        },
      });

      console.log("Estamos en Service");
      console.log(
        "Una lista de todas las criptomonedas disponibles para pagos"
      );
      console.log(response.data);

      return response.data; 
    } catch (error) {
      console.error("Error al obtener la lista de monedas:", error);
      return null;
    }
  },
};

export default Service;

