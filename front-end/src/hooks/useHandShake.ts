import { useContext } from "react";
import { HandShakeContext } from "contexts/handShakeContext";

const useConnect = () => {
  return useContext(HandShakeContext);
};

export default useConnect;
