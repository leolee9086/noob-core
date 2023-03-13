const noobBridge = {
  registry: [],
  servicies:{}
}
export let addEventBridge = (app) => {
  app.ws("/bridge", (ws, req) => {
    let _url = new URL(`http://127.0.0.1${req.url}`);
    let id = _url.searchParams.get("id");
    let serviceID = _url.searchParams.get("serviceID");
    if (id) {
      !noobBridge.registry ? (noobBridge.registry = []) : null;
      noobBridge.registry.push({ id: id, client: ws });
    }
    if (serviceID) {
      noobBridge.servicies[serviceID] = ws;
    }
    ws.on("message", (msg) => {
      let string = msg.toString();
      let json;
      try {
        json = JSON.parse(string);
      } catch (e) {
        return;
      }
      if (json.serviceID && noobBridge.servicies[json.serviceID]) {
        noobBridge.servicies[json.serviceID].send(JSON.stringify(json));
      } else if (json.callerID) {
        noobBridge.registry.forEach((element) => {
          element && element.client && element.id == json.callerID
            ? element.client.send(JSON.stringify(json))
            : null;
        });
      } else if (json.type) {
        noobBridge.registry.forEach((element) => {
          element && element.client
            ? element.client.send(JSON.stringify(json))
            : null;
        });
      }
    });
  });
};
