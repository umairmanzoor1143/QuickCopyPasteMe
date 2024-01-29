import React from "react";
import { EditorContent, useEditor, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const MyEditorProvider = ({
  slotBefore,
  slotAfter,
  content = "",
  ...rest
}: EditorProviderProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      // This will run whenever the content changes
      console.log(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      {slotBefore}
      <EditorContent editor={editor} />
      {slotAfter}
    </>
  );
};

export default MyEditorProvider;
