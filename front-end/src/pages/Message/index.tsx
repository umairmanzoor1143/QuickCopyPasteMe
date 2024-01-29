import React, { useEffect, useState } from "react";
import "./layout.scss";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";
import Scrollbar from "components/Scrollbar";
import useSocket from "hooks/useSocket";
import MyEditorProvider from "./EditorProvider";
type Props = {
  roomId: string;
};

const MessageSection = ({ roomId }: Props) => {
  const { editor } = useCurrentEditor();
  const [content, setContent] = useState("");
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket?.on("receive_message", (d) => {
        console.log({ d });
      });
    }
    return () => {
      socket?.off("send_message");
      socket?.off("receive_message");
    };
  }, []);
  const MenuBar = () => {
    if (!editor) {
      return null;
    }
    return (
      <div className='tabs-editor'>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={classNames("code-svg", {
            "is-active": editor.isActive("codeBlock"),
          })}
        >
          {`<>`}
        </button>
      </div>
    );
  };
  return (
    <div className='h-100'>
      <div className='h-100 two-panel-layout'>
        <div className='left-side'>
          <div className='text-area-editor'>
            <Scrollbar className='editor-custom-scroll'>
              <MyEditorProvider slotBefore={<MenuBar />}>
                <></>
              </MyEditorProvider>
            </Scrollbar>
          </div>
          <div className='footer'>
            <button
              className={classNames("code-svg")}
              onClick={() => {
                socket?.emit("send_message", { roomId, data: "sender" });
              }}
            >
              Send
            </button>
          </div>
        </div>
        <div className='right-side'>asdasdas</div>
      </div>
    </div>
  );
};

export default MessageSection;
