import React from "react";
import { EditorContent, useEditor, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
type EditorContentProps = EditorProviderProps & {
  setContent: (e: string) => void;
};
const MyEditorProvider = ({
  slotBefore,
  slotAfter,
  content = "",
  setContent,
  ...rest
}: EditorContentProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(`${editor.getHTML()}`);
      console.log(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      {React.cloneElement(slotBefore as any, {
        editor,
      })}
      <EditorContent editor={editor} />
      {slotAfter}
    </>
  );
};

export default MyEditorProvider;
