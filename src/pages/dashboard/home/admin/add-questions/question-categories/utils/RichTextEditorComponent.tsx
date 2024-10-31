import './richTextStyle.scss';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor, EditorContent } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Document from '@tiptap/extension-document';
import Gapcursor from '@tiptap/extension-gapcursor';
import Paragraph from '@tiptap/extension-paragraph';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Text from '@tiptap/extension-text';
import Image from '@tiptap/extension-image';
import {
  TbTable,
  TbColumnInsertLeft,
  TbColumnInsertRight,
  TbColumnRemove,
  TbRowInsertTop,
  TbRowInsertBottom,
  TbRowRemove,
  TbTableOff,
  TbPhoto,
} from 'react-icons/tb';

export function RichTextEditorComponent({ content, setContent, index }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Document,
      Paragraph,
      Text,
      Gapcursor,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'tiptap-table',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML(), index);
    },
  });

  // Table functions (keeping existing ones)
  const addTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const addColumnBefore = () => {
    editor?.chain().focus().addColumnBefore().run();
  };

  const addColumnAfter = () => {
    editor?.chain().focus().addColumnAfter().run();
  };

  const deleteColumn = () => {
    editor?.chain().focus().deleteColumn().run();
  };

  const addRowBefore = () => {
    editor?.chain().focus().addRowBefore().run();
  };

  const addRowAfter = () => {
    editor?.chain().focus().addRowAfter().run();
  };

  const deleteRow = () => {
    editor?.chain().focus().deleteRow().run();
  };

  const deleteTable = () => {
    editor?.chain().focus().deleteTable().run();
  };

  const isTableSelected = () => {
    return editor?.isActive('table') ?? false;
  };

  // Image handling functions
  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      if (!e.target.files?.length) return;

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      // try {
      //   // Replace this with your actual image upload API endpoint
      //   const response = await fetch('/api/upload-image', {
      //     method: 'POST',
      //     body: formData,
      //   });

      //   if (!response.ok) throw new Error('Upload failed');

      //   const data = await response.json();
      //   // Insert the image URL returned from your server
      //   editor?.chain().focus().setImage({ src: data.imageUrl }).run();
      // } catch (error) {
      //   console.error('Image upload failed:', error);
      //   // Handle error (show notification, etc.)
      // }
      editor
        ?.chain()
        .focus()
        .setImage({
          src: 'https://www.gracern.com/wp-content/themes/hello-theme/assets/img/grace.png',
        })
        .run();
    };

    input.click();
  };

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          {/* Existing control groups */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          {/* Table Controls Group */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control onClick={addTable} title="Insert Table">
              <TbTable size={16} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={addColumnBefore}
              title="Add Column Before"
              disabled={!isTableSelected()}
            >
              <TbColumnInsertLeft size={16} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={addColumnAfter}
              title="Add Column After"
              disabled={!isTableSelected()}
            >
              <TbColumnInsertRight size={16} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={deleteColumn}
              title="Delete Column"
              disabled={!isTableSelected()}
            >
              <TbColumnRemove size={16} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={addRowBefore}
              title="Add Row Before"
              disabled={!isTableSelected()}
            >
              <TbRowInsertTop size={16} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={addRowAfter}
              title="Add Row After"
              disabled={!isTableSelected()}
            >
              <TbRowInsertBottom size={16} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={deleteRow}
              title="Delete Row"
              disabled={!isTableSelected()}
            >
              <TbRowRemove size={16} />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={deleteTable}
              title="Delete Table"
              disabled={!isTableSelected()}
            >
              <TbTableOff size={16} />
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>

          {/* Image Control Group */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control onClick={addImage} title="Add Image">
              <TbPhoto size={16} />
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  );
}

// pages/api/upload-image.js
// import formidable from 'formidable';
// import { v4 as uuidv4 } from 'uuid';
// import path from 'path';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const form = new formidable.IncomingForm();
//     form.uploadDir = path.join(process.cwd(), 'public/uploads');
//     form.keepExtensions = true;

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ message: 'Upload failed' });
//       }

//       const file = files.image;
//       const fileName = `${uuidv4()}${path.extname(file.originalFilename)}`;
//       const newPath = path.join(form.uploadDir, fileName);

//       fs.renameSync(file.filepath, newPath);

//       res.status(200).json({
//         imageUrl: `/uploads/${fileName}`,
//       });
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ message: 'Upload failed' });
//   }
// }
