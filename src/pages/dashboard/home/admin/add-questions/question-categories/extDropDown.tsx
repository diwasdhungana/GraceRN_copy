import {
  Button,
  Group,
  InputLabel,
  MenuDropdown,
  Paper,
  Select,
  Space,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useRef, useState } from 'react';
import { RichTextEditorComponent } from './utils/RichTextEditorComponent';
import { SubmitQuestion } from './utils/SubmitQuestion';
import css from '@/pages/dashboard/everything.module.css';

export const ExtDropDown = ({ dataTunnel, response, setResponse }) => {
  const editorRef = useRef(null);
  const [counter, setCounter] = useState(2);
  const [options, setOptions] = useState([
    { type: 'text', value: '', name: 'text 0' },
    { type: 'dropdown', value: [], name: 'dropdown 1' },
  ]);
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [points, setPoints] = useState(5);

  const handleInput = (event) => {
    const input = event.target.innerHTML;

    // Update the options array without causing re-renders
    const newOptions = [...options];
    newOptions[index].value = input;
    setOptions(newOptions);

    // Move caret to the end after each input
    moveCaretToEnd();
  };

  const moveCaretToEnd = () => {
    const selection = window.getSelection();
    const range = document.createRange();

    if (editorRef.current) {
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <Paper shadow="xs" p="lg" radius="lg" mt="sm">
      <Title order={3} mb="xl">
        Type : Extended Dropdown
      </Title>
      <Group>
        <TextInput
          label="Points (1-20)"
          type="number"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value))}
          placeholder="Points"
          min={1}
          max={20}
        />
      </Group>
      <InputLabel>Main Question (Title)</InputLabel>
      <RichTextEditorComponent
        content={title}
        setContent={(item, index) => {
          setTitle(item, index);
        }}
        index={0}
      />
      <Stack mt="md">
        <InputLabel>Text with dropdown</InputLabel>
        <Group>
          {options.map((option, index) =>
            option.type === 'text' ? (
              <div
                id="ctleditor_html"
                className={css.edit_textEditor}
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={editorRef}
                dangerouslySetInnerHTML={{ __html: option.value }}
                onInput={handleInput}
              />
            ) : option.type === 'dropdown' ? (
              <Select
                placeholder={option.name}
                data={option.value}
                defaultValue="React"
                allowDeselect={false}
              />
            ) : null
          )}
        </Group>
        <Group justify="space-between">
          <Group>
            <Button
              size="sm"
              onClick={() => {
                setOptions([
                  ...options,
                  { type: 'text', value: 'type here..', name: `text ${counter}` },
                ]);
                setCounter(counter + 1);
              }}
            >
              Add Text field
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setOptions([
                  ...options,
                  { type: 'dropdown', value: [], name: `dropdown ${counter}` },
                ]);
                setCounter(counter + 1);
              }}
            >
              Add Dropdown
            </Button>
          </Group>
          <Button
            bg="red"
            onClick={() => {
              setOptions(options.slice(0, options.length - 1));
              setCounter(counter + 1);
            }}
          >
            Remove Last field
          </Button>
        </Group>
      </Stack>

      <InputLabel mt="lg">Explanation (Shown after Answer Submit.)</InputLabel>
      <RichTextEditorComponent
        content={explanation}
        setContent={(item, index) => {
          setExplanation(item, index);
        }}
        index={0}
      />
      <Space h="lg" />

      <SubmitQuestion
        dataTunnel={() => ({ ...dataTunnel, options, title, points, explanation })}
        response={response}
        setResponse={setResponse}
      />
    </Paper>
  );
};
