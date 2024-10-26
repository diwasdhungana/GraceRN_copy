import {
  Button,
  Group,
  InputLabel,
  Paper,
  Combobox as ComboBox,
  InputBase,
  Space,
  Stack,
  TextInput,
  Title,
  useCombobox,
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
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleInput = (event) => {
    const input = event.target.innerHTML;
    const newOptions = [...options];
    newOptions[index].value = input;
    setOptions(newOptions);
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
        setContent={(item, index) => setTitle(item, index)}
        index={0}
      />
      <Stack mt="md">
        <InputLabel>Text with dropdown</InputLabel>
        <Stack>
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
                <ComboBoxComponent
                  key={index}
                  option={option}
                  setOptions={setOptions}
                  options={options}
                  index={index}
                  correctAnswer={correctAnswer}
                  setCorrectAnswer={setCorrectAnswer}
                />
              ) : null
            )}
          </Group>
        </Stack>
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
            <Button
              size="sm"
              onClick={() => {
                setOptions([...options, { type: 'next-line' }]);
              }}
            >
              &#9166;
            </Button>
          </Group>
          {options.length > 0 && (
            <Button
              bg="red"
              onClick={() => {
                setOptions(options.slice(0, options.length - 1));
                setCounter(counter + 1);
              }}
            >
              Remove Last field
            </Button>
          )}
        </Group>
      </Stack>

      <InputLabel mt="lg">Explanation (Shown after Answer Submit.)</InputLabel>
      <RichTextEditorComponent
        content={explanation}
        setContent={(item, index) => setExplanation(item, index)}
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

const ComboBoxComponent = ({
  option,
  setOptions,
  options,
  index,
  correctAnswer,
  setCorrectAnswer,
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState('');
  const exactOptionMatch = option.value.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? option.value
    : option.value.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

  const handleOptionSubmit = (val) => {
    if (val === '$create') {
      const newOptions = [...options];
      newOptions[index].value = [...newOptions[index].value, search];
      setOptions(newOptions);
      setSearch('');
    } else {
      setSearch(val);
    }
    combobox.closeDropdown();
  };

  return (
    <ComboBox store={combobox} withinPortal={false} onOptionSubmit={handleOptionSubmit}>
      <ComboBox.Target>
        <InputBase
          rightSection={<ComboBox.Chevron />}
          value={search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            combobox.openDropdown();
          }}
          placeholder={option.name}
          rightSectionPointerEvents="none"
        />
      </ComboBox.Target>

      <ComboBox.Dropdown>
        <ComboBox.Options>
          {filteredOptions.map((item) => (
            <ComboBox.Option key={item} value={item}>
              {item}
            </ComboBox.Option>
          ))}
          {!exactOptionMatch && search.trim().length > 0 && (
            <ComboBox.Option value="$create">+ Create {search}</ComboBox.Option>
          )}
        </ComboBox.Options>
      </ComboBox.Dropdown>
    </ComboBox>
  );
};
