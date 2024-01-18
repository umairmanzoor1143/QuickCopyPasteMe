import React from "react";
import "./layout.scss";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";
import Scrollbar from "components/Scrollbar";
type Props = {};

const MenuBar = () => {
  const { editor } = useCurrentEditor();

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
const TwoPanelLayout = (props: Props) => {
  return (
    <div className='h-100 two-panel-layout'>
      <div className='left-side'>
        <div className='text-area-editor'>
          <Scrollbar
            className='editor-custom-scroll'
          >
            <EditorProvider slotBefore={<MenuBar />} extensions={[StarterKit]}>
              <></>
            </EditorProvider>
          </Scrollbar>
        </div>
        <div className='footer'>
          <button className={classNames("code-svg")}>Send</button>
        </div>
      </div>
      <div className='right-side'>asdasdas</div>
    </div>
  );
};

export default TwoPanelLayout;
