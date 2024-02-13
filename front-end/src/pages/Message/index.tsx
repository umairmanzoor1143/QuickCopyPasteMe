import React, { useEffect, useState } from "react";
import "./layout.scss";
import { Editor } from "@tiptap/react";
import classNames from "classnames";
import Scrollbar from "components/Scrollbar";
import useSocket from "hooks/useSocket";
import MyEditorProvider from "./EditorProvider";
import { ConnectionEvents } from "constant";
import Warning from "components/Warning";
import useConnect from "hooks/useHandShake";
import { v4 } from "uuid";
type Props = {
  roomId: string;
};
const MessageBox = ({ htmlString, id }: { htmlString: string; id: string }) => {
  const [isCopy, setIsCopy] = useState(false);
  const copyText = (messageId: string) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const text = doc.body.textContent || "";
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
        setIsCopy(id === messageId);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  useEffect(() => {
    const duration = 3500;
    setTimeout(() => setIsCopy(false), duration);
  }, [isCopy]);

  return (
    <div className='tiptap'>
      <div
        className='message-box'
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></div>
      {!isCopy ? (
        <>
          <button onClick={() => copyText(id)} className='copy-svg'>
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
        </>
      ) : (
        <button className='copy-svg'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='14'
            height='14'
          >
            <path
              fill='green'
              d='M10.3 15.4l-4.1-4.2L5 12.7l5.3 5.3 8.3-8.2-1.2-1.3z'
            />
          </svg>
        </button>
      )}
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
              const id = v4();
              return <MessageBox htmlString={ele} id={id} key={id} />;
            })}
          </Scrollbar>
        </div>
      </div>
    </div>
  );
};

export default MessageSection;
