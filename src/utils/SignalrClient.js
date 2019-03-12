import { HubConnectionBuilder } from "@aspnet/signalr";
import { BASE_URL } from "./ApiEndpoint";

const hub = new HubConnectionBuilder()
  .withUrl(BASE_URL + "/hub/product")
  .build();



class SignalrClient {
  sendAddProduct = callBack => {
    hub.on("Add", callBack);
    hub.start().then(() =>  {
      console.log("Connected");
    });
  };
}

export default new SignalrClient();
