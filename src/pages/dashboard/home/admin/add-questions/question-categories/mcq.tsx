import React from 'react';
import {
  Button,
  Group,
  InputLabel,
  Paper,
  Space,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useRef, useState } from 'react';
import { RichTextEditorComponent } from './utils/RichTextEditorComponent';
import { SubmitQuestion } from './utils/SubmitQuestion';
export const Mcq = ({ dataTunnel, response, setResponse }: any) => {
  const inputRefs = useRef<any[]>([]); // To hold multiple refs
  const [options, setOptions] = useState([
    { value: 'option 0', checked: false },
    { value: 'option 1', checked: false },
  ]);
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [points, setPoints] = useState(5);

  const handleFocus = (index: number) => {
    // Select the text inside the input on focus
    if (inputRefs.current[index]) {
      inputRefs.current[index].select();
    }
  };

  return (
    <Paper shadow="xs" p="lg" radius="lg" mt="sm">
      <Title order={3} mb="xl">
        Type : Select All That Apply
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
        <InputLabel>Options :</InputLabel>
        {options.map((option, index) => (
          <Group gap="xs" key={index} w="100%">
            <input
              type="radio"
              name="selectOptions"
              value={option.value}
              checked={option.checked}
              onChange={(e) => {
                const newOptions = options;
                newOptions[index].checked = !newOptions[index].checked;
                setOptions([...newOptions]);
              }}
            />
            <Textarea
              value={option.value}
              ref={(el) => (inputRefs.current[index] = el)} // Assigning refs for each input
              onFocus={() => handleFocus(index)} // Triggering select on focus
              onChange={(e) => {
                const newOptions = options.map((opt) => {
                  return { ...opt, value: opt.value === option.value ? e.target.value : opt.value };
                });
                setOptions(newOptions);
              }}
              autosize
              minRows={2}
              w="90%"
            />
            <Button
              variant="subtle"
              onClick={() => {
                const newOptions = options.filter((opt) => opt.value !== option.value);
                setOptions(newOptions);
              }}
            >
              X
            </Button>
          </Group>
        ))}
        <Group>
          <Button
            size="sm"
            onClick={() => {
              setOptions([...options, { value: 'option ' + options.length, checked: false }]);
            }}
          >
            Add Option
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
