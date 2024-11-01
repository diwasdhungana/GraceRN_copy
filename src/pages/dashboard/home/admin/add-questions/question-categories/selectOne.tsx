import {
  Button,
  Group,
  InputLabel,
  NumberInput,
  Paper,
  Radio,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useRef, useState } from 'react';
import { RichTextEditorComponent } from '../utils/RichTextEditorComponent';
import { SubmitQuestion } from '../utils/SubmitQuestion';

export const SelectOne = ({ dataTunnel, response, setResponse }: any) => {
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
        Type : Select One
      </Title>
      <Group>
        <NumberInput
          label="Points (1-20)"
          value={points}
          onChange={(e) => setPoints(Number(e))}
          placeholder="Points"
          min={1}
          max={20}
        />
      </Group>
      <InputLabel>Main Question (Title)</InputLabel>
      {response.titleError && <Text c="red">{response.titleError}</Text>}
      <RichTextEditorComponent
        content={title}
        setContent={(item, index) => {
          setTitle(item, index);
        }}
        index={0}
      />

      <Stack mt="md">
        <InputLabel required>Options :</InputLabel>
        {response.optionsError && <Text c="red">{response.optionsError}</Text>}
        {options.map((option, index) => (
          <Group gap="xs" key={index} w="100%">
            <Radio
              name="selectOne"
              // value={option.value}
              checked={option.checked}
              onChange={(e) => {
                const newOptions = options.map((opt) => {
                  return { ...opt, checked: opt === option };
                });
                setOptions(newOptions);
              }}
            />
            <Textarea
              value={option.value}
              ref={(el) => (inputRefs.current[index] = el)} // Assigning refs for each input
              onFocus={() => handleFocus(index)} // Triggering select on focus
              onChange={(e) => {
                const newOptions = options.map((opt) => {
                  return { ...opt, value: opt === option ? e.target.value : opt.value };
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
                const newOptions = options.filter((opt) => opt !== option);
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

      <InputLabel mt="lg" required>
        Explanation (Shown after Answer Submit.)
      </InputLabel>
      {response.explanationError && <Text c="red">{response.explanationError}</Text>}
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
