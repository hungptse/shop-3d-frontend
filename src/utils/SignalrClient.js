import { HubConnectionBuilder } from "@aspnet/signalr";
import { BASE_URL } from "./ApiEndpoint";

class SignalrClient {
  connectHubProduct() {
    var hub = new HubConnectionBuilder()
      .withUrl(BASE_URL + "/hub/product")
      .build();
      
    hub.start();
    hub.on("Add", data => {
    //   console.log(data);
      return data;
    });
  }
}

export default new SignalrClient();
