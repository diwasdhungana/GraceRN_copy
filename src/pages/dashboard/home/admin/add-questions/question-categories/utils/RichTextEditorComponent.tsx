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
import {
  TbTable,
  TbColumnInsertLeft,
  TbColumnInsertRight,
  TbColumnRemove,
  TbRowInsertTop,
  TbRowInsertBottom,
  TbRowRemove,
  TbTableOff,
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
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML(), index);
    },
  });

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

  return (
    <>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
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

          {/* Table Controls Group with React Icons */}
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

// Table.configure({
//   resizable: true,
// }),
// TableRow,
// TableHeader,
// TableCell,

{
  /* <div className="control-group">
  <div className="button-group">
    <button
      onClick={() =>
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
      }
    >
      Insert table
    </button>
    <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
      Add column before
    </button>
    <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
      Add column after
    </button>
    <button onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column</button>
    <button onClick={() => editor.chain().focus().addRowBefore().run()}>
      Add row before
    </button>
    <button onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after</button>
    <button onClick={() => editor.chain().focus().deleteRow().run()}>Delete row</button>
    <button onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
    <button onClick={() => editor.chain().focus().mergeCells().run()}>Merge cells</button>
    <button onClick={() => editor.chain().focus().splitCell().run()}>Split cell</button>
    <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
      Toggle header column
    </button>
    <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
      Toggle header row
    </button>
    <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
      Toggle header cell
    </button>
    <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
      Merge or split
    </button>
    <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
      Set cell attribute
    </button>
    <button onClick={() => editor.chain().focus().fixTables().run()}>Fix tables</button>
    <button onClick={() => editor.chain().focus().goToNextCell().run()}>
      Go to next cell
    </button>
    <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
      Go to previous cell
    </button>
  </div>
</div>
<EditorContent editor={editor} /> */
}
