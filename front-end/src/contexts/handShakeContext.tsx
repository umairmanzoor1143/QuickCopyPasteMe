import React, { createContext, ReactNode, useEffect, useState } from "react";


export interface ISocket {
  room?: RoomType;
  setRoom?: React.Dispatch<RoomType>;
}
export const HandShakeContext = createContext<ISocket>({});

const HandShakeProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [room, setRoom] = useState<RoomType>({
    confirmed: false,
    room: "",
  });

  return (
    <HandShakeContext.Provider value={{ room, setRoom }}>
      {props.children}
    </HandShakeContext.Provider>
  );
};

export default HandShakeProvider;
