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
import { generateId } from '@/utilities/uid';

export const ExtDropDown = ({ dataTunnel, response, setResponse }) => {
  const editorRefs = useRef<(HTMLDivElement | null)[]>();
  const [counter, setCounter] = useState(1);
  const [options, setOptions] = useState([
    { type: 'text', value: 'type..', name: 'text 0', id: generateId() },
    { type: 'dropdown', value: [], name: 'dropdown 0', id: generateId() },
  ]);
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [points, setPoints] = useState(5);
  const [correctAnswer, setCorrectAnswer] = useState([]); //eg [{id:"sfdsidflsk", value : "option 1" }]

  const handleFocus = (index: number) => {
    // Select the text inside the input on focus
    console.log('index', index, editorRefs.current);

    if (editorRefs.current) {
      editorRefs.current[index].select();
    }
  };

  const moveCaretToEnd = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    console.clear();
    console.log('editorRefs.current', editorRefs);
    if (editorRefs.current) {
      range.selectNodeContents(editorRefs.current);

      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
  const groupOptions = (options) => {
    const groups = [];
    let currentGroup = [];

    options.forEach((option) => {
      if (option.type === 'next-line') {
        if (currentGroup.length > 0) groups.push(currentGroup);
        currentGroup = [];
      } else {
        currentGroup.push(option);
      }
    });

    if (currentGroup.length > 0) groups.push(currentGroup); // Add the last group if any
    return groups;
  };

  const groupedOptions = groupOptions(options);

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
          {groupedOptions.map((group, groupIndex) => (
            <Group key={groupIndex}>
              &#9166;
              {group.map((option, index) =>
                option.type === 'text' ? (
                  <Group gap="0px">
                    ⓣ
                    <div
                      id="ctleditor_html"
                      className={css.edit_textEditor}
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      ref={(el) => (editorRefs.current[index] = el)}
                      dangerouslySetInnerHTML={{ __html: option.value }}
                      onFocus={() => handleFocus(index)}
                      onInput={(event) => {
                        const input = (event.target as HTMLElement).innerHTML;
                        const newOptions = options.map((opt) =>
                          opt.id === option.id ? { ...opt, value: input } : opt
                        );
                        moveCaretToEnd();
                        setOptions(newOptions);
                      }}
                    />
                  </Group>
                ) : option.type === 'dropdown' ? (
                  <ComboBoxComponent
                    option={option}
                    setOptions={setOptions}
                    options={options}
                    id={option.id}
                    correctAnswer={correctAnswer}
                    setCorrectAnswer={setCorrectAnswer}
                  />
                ) : null
              )}
            </Group>
          ))}
        </Stack>

        <Group justify="space-between" mt="md">
          <Group>
            <Button
              size="sm"
              onClick={() => {
                setOptions([
                  ...options,
                  { type: 'text', value: 'type..', name: `text ${counter}`, id: generateId() },
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
                  { type: 'dropdown', value: [], name: `dropdown ${counter}`, id: generateId() },
                ]);
                setCounter(counter + 1);
              }}
            >
              Add Dropdown
            </Button>

            <Button
              size="sm"
              onClick={() => {
                setOptions([
                  ...options,
                  { type: 'next-line', id: generateId(), value: 'next-line' },
                ]);
              }}
            >
              &#9166; New Line
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
        dataTunnel={() => ({ ...dataTunnel, options, title, points, explanation, correctAnswer })}
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
  correctAnswer,
  setCorrectAnswer,
  id,
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
      const newOptions = options.map((opt) =>
        opt.id === id ? { ...opt, value: [...opt.value, search] } : opt
      );
      setOptions(newOptions);
      setSearch('');
    } else {
      setSearch(val);

      // Update the correctAnswer array with the selected value
      setCorrectAnswer((prevCorrectAnswers) => {
        // Check if this id already exists in correctAnswer
        const existingAnswerIndex = prevCorrectAnswers.findIndex((answer) => answer.id === id);

        if (existingAnswerIndex >= 0) {
          // If it exists, update the value
          const updatedAnswers = [...prevCorrectAnswers];
          updatedAnswers[existingAnswerIndex].value = val;
          return updatedAnswers;
        } else {
          // If it does not exist, add the new entry
          return [...prevCorrectAnswers, { id, value: val }];
        }
      });
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
