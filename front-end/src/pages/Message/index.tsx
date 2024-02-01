import React, { useEffect, useState } from "react";
import "./layout.scss";
import {
  Editor,
  EditorOptions,
  EditorProvider,
  EditorProviderProps,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";
import Scrollbar from "components/Scrollbar";
import useSocket from "hooks/useSocket";
import MyEditorProvider from "./EditorProvider";
import { ConnectionEvents } from "constant";
type Props = {
  roomId: string;
};

const MessageSection = ({ roomId }: Props) => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const { socket } = useSocket();
  console.log({ messages });
  useEffect(() => {
    if (socket) {
      socket?.on(
        ConnectionEvents.RECEIVE_DATA,
        (d: { sender: string; message: string }) => {
          setMessages((pre) => {
            return [...pre, d.message];
          });
        }
      );
    }
    return () => {
      socket?.off(ConnectionEvents.RECEIVE_DATA);
    };
  }, []);
  const MenuBar = ({ editor }: { editor?: Editor }) => {
    if (!editor) {
      return null;
    }
    return (
      <div className='tabs-editor'>
        <button
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={classNames("code-svg", {
            "is-active": editor?.isActive("codeBlock"),
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
            <Scrollbar ctnClass='editor-custom-scroll'>
              <MyEditorProvider
                slotBefore={<MenuBar />}
                setContent={setContent}
                content={content}
              >
                <></>
              </MyEditorProvider>
            </Scrollbar>
          </div>
          <div className='footer'>
            <button
              className={classNames("code-svg")}
              onClick={() => {
                socket?.emit(ConnectionEvents.SEND_DATA, {
                  roomId,
                  message: content,
                });
                setContent("");
              }}
            >
              Send
            </button>
          </div>
        </div>
        <div className='right-side'>
          <Scrollbar className='editor-custom-scroll'>
            {messages.map((ele, i) => {
              return (
                <div
                  className='message-box tiptap'
                  key={ele.slice(0, 10) + i}
                  dangerouslySetInnerHTML={{ __html: ele }}
                ></div>
              );
            })}
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};

export default MessageSection;
