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
import Warning from "components/Warning";
import useConnect from "hooks/useHandShake";
type Props = {
  roomId: string;
};
const MessageBox = ({ htmlString }: { htmlString: string }) => {
  const copyText = () => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const text = doc.body.textContent || "";
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className='tiptap'>
      <div
        className='message-box'
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></div>
      <button onClick={copyText} className='copy-svg'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          className='feather feather-copy'
        >
          <rect x='9' y='9' width='13' height='13' rx='2' ry='2'></rect>
          <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'></path>
        </svg>
      </button>
    </div>
  );
};
const MessageSection = ({ roomId }: Props) => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const { socket } = useSocket();
  const { isDisconnect } = useConnect();

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
  const SlotBefore = ({ editor }: { editor?: Editor }) => {
    return (
      <div className='footer'>
        {isDisconnect ? (
          <Warning />
        ) : (
          <button
            className={classNames("code-svg")}
            onClick={() => {
              if (!!content) {
                socket?.emit(ConnectionEvents.SEND_DATA, {
                  roomId,
                  message: content,
                });
                setContent("");
                editor?.commands.clearContent();
              }
            }}
          >
            Send
          </button>
        )}
      </div>
    );
  };
  return (
    <div className='h-100'>
      <div className='h-100 two-panel-layout'>
        <div className='left-side'>
          <div className='text-area-editor'>
            <MyEditorProvider
              slotBefore={<MenuBar />}
              setContent={setContent}
              content={content}
              slotAfter={<SlotBefore />}
            >
              <></>
            </MyEditorProvider>
          </div>
        </div>
        <div className='right-side'>
          <Scrollbar>
            {messages.map((ele, i) => {
              return <MessageBox htmlString={ele} key={ele.slice(0, 10) + i} />;
            })}
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};

export default MessageSection;
