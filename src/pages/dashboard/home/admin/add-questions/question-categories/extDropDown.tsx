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
  Text,
} from '@mantine/core';
import React, { useRef, useState, useLayoutEffect } from 'react';
import { RichTextEditorComponent } from '../utils/RichTextEditorComponent';
import { SubmitQuestion } from '../utils/SubmitQuestion';
import css from '@/pages/dashboard/everything.module.css';
import { generateId } from '@/utilities/uid';
import { set } from 'date-fns';

export const ExtDropDown = ({ dataTunnel, response, setResponse }) => {
  const editorRefs = useRef(new Map());
  const [counter, setCounter] = useState(1);
  const [options, setOptions] = useState([
    { type: 'text', value: 'type..', name: 'text 0', id: generateId() },
    { type: 'dropdown', value: [], name: 'dropdown 0', id: generateId() },
  ]);
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [points, setPoints] = useState(5);
  const [correctAnswer, setCorrectAnswer] = useState([]); // eg [{id:"sfdsidflsk", value : "option 1" }]
  const [focusedId, setFocusedId] = useState(null); // Now using focusedId instead of index

  const handleFocus = (id) => {
    setFocusedId(id); // Update focused option by id on focus
  };

  const moveCaretToEnd = (id) => {
    const selection = window.getSelection();
    const range = document.createRange();
    const editorElement = editorRefs.current.get(id);

    if (editorElement) {
      range.selectNodeContents(editorElement);
      range.collapse(false); // Move caret to the end
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  useLayoutEffect(() => {
    if (focusedId) {
      moveCaretToEnd(focusedId); // Move caret to the end of the focused element
    }
  }, [options, focusedId]);

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
      {response.titleError && <Text c="red">{response.titleError}</Text>}
      <RichTextEditorComponent content={title} setContent={(item) => setTitle(item)} index={0} />
      <Stack mt="md">
        <InputLabel>Text with dropdown</InputLabel>
        <Stack>
          {groupedOptions.map((group, groupIndex) => (
            <Group key={groupIndex}>
              &#9166;
              {group.map((option) =>
                option.type === 'text' ? (
                  <Group gap="0px" key={option.id}>
                    ⓣ
                    <div
                      key={option.id}
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      ref={(el) => editorRefs.current.set(option.id, el)}
                      dangerouslySetInnerHTML={{ __html: option.value }}
                      className={css.htmlContentDisplay}
                      onFocus={() => handleFocus(option.id)}
                      onInput={(event) => {
                        const input = event.currentTarget.innerHTML;
                        setFocusedId(option.id); // Update the focused id
                        setOptions((prevOptions) =>
                          prevOptions.map((opt) =>
                            opt.id === option.id ? { ...opt, value: input } : opt
                          )
                        );
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
                    key={option.id}
                  />
                ) : null
              )}
            </Group>
          ))}
        </Stack>
        {response.optionsError && <Text c="red">{response.optionsError}</Text>}
        <Group justify="space-between" mt="md">
          <Group>
            <Button
              size="sm"
              onClick={() => {
                const newField = {
                  type: 'text',
                  value: '',
                  name: `text ${counter}`,
                  id: generateId(),
                };
                setOptions([...options, newField]);
                setCounter(counter + 1);
                setFocusedId(newField.id); // Set focus to the new field's ID
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
                setFocusedId('');
              }}
            >
              Add Dropdown
            </Button>

            <Button
              size="sm"
              onClick={() => {
                if (options[options.length - 1].type === 'next-line') return;
                setOptions([
                  ...options,
                  { type: 'next-line', id: generateId(), value: 'next-line' },
                ]);
                setFocusedId('');
              }}
            >
              &#9166; New Line
            </Button>
          </Group>
          {options.length > 0 && (
            <Button
              bg="red"
              onClick={() => {
                if (options.findLast((opt) => opt.type === 'dropdown') && options.length > 1) {
                  // Remove the correct answer from the correctAnswer array
                  setCorrectAnswer((prevCorrectAnswers) =>
                    prevCorrectAnswers.filter(
                      (answer) => answer.id !== options[options.length - 1].id
                    )
                  );
                }
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
      {response.explanationError && <Text c="red">{response.explanationError}</Text>}
      <RichTextEditorComponent
        index={0}
        content={explanation}
        setContent={(item) => setExplanation(item)}
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
