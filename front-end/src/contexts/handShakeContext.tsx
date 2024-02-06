import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface ISocket {
  room?: RoomType;
  setRoom?: React.Dispatch<RoomType>;
  isDisconnect?: boolean;
  setIsDisconnect?: React.Dispatch<boolean>;
}
export const HandShakeContext = createContext<ISocket>({});

const HandShakeProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [isDisconnect, setIsDisconnect] = useState<boolean>(false);
  const [room, setRoom] = useState<RoomType>({
    confirmed: false,
    room: "",
  });

  return (
    <HandShakeContext.Provider
      value={{ room, setRoom, setIsDisconnect, isDisconnect }}
    >
      {props.children}
    </HandShakeContext.Provider>
  );
};

export default HandShakeProvider;
