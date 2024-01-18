import { useContext } from "react";
import { WebSocketContext } from "contexts/socketContext";

const useSocket = () => {
  return useContext(WebSocketContext);
};

export default useSocket;
