import store from "../redux/store";

const socket = new WebSocket("ws://localhost:4000");

socket.onopen = () => {
  console.log("Connected to WebSocket server");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  // Dispatch actions to update Redux state
  if (data.type === "ADD_PRODUCT") {
    store.dispatch({ type: "ADD_PRODUCT", payload: data.payload });
  } else if (data.type === "UPDATE_PRODUCT") {
    store.dispatch({ type: "UPDATE_PRODUCT", payload: data.payload });
  } else if (data.type === "DELETE_PRODUCT") {
    store.dispatch({ type: "DELETE_PRODUCT", payload: data.payload });
  }
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};

export default socket;
