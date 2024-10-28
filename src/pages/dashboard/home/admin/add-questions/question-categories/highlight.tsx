import {
  Button,
  Checkbox,
  Group,
  InputLabel,
  Paper,
  Space,
  Stack,
  Textarea,
  TextInput,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { RichTextEditorComponent } from './utils/RichTextEditorComponent';
import { SubmitQuestion } from './utils/SubmitQuestion';

export const Highlight = ({ dataTunnel, response, setResponse }) => {
  const { colorScheme } = useMantineColorScheme();
  const inputRefs = useRef<any[]>([]); // To hold multiple refs
  const contentRef = useRef<HTMLDivElement>(null); // To reference the content div
  const [mainText, setMainText] = useState('');
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [points, setPoints] = useState(5);
  const [toSend, setToSend] = useState({});
  const [correct, setCorrect] = useState([]);

  const handleFocus = (index: number) => {
    // Select the text inside the input on focus
    if (inputRefs.current[index]) {
      inputRefs.current[index].select();
    }
  };
  useEffect(() => {
    const updatedContent = mainText
      .replace(/<mark>/g, '<div class="highlight" >')
      .replace(/<\/mark>/g, '</div>')
      .replace(/<p>/g, '<div>')
      .replace(/<\/p>/g, '</div>');
    setToSend(updatedContent);
    // console.clear();
    // console.log(updatedContent);
  }, [mainText]);

  useEffect(() => {
    const elements = contentRef.current.querySelectorAll('.highlight');
    elements.forEach((element, index) => {
      element.onclick = () => handleClick(element.innerText, index);
      element.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
      element.style.display = 'inline';
      // set cursor to pointer on hover
      element.style.cursor = 'pointer';
    });
  }, [toSend]);

  const handleClick = (text, index) => {
    const newCorrect = correct;
    const found = newCorrect.findIndex((item) => item.text === text);
    if (found === -1) {
      newCorrect.push({ text, index });
    } else {
      newCorrect.splice(found, 1);
    }
    setCorrect(newCorrect);

    const elements = contentRef.current.querySelectorAll('.highlight');
    elements.forEach((element, i) => {
      if (newCorrect.findIndex((item) => item.index === i) !== -1) {
        element.style.backgroundColor = 'yellow';
        element.style.color = 'black';
      } else {
        // translucent yellow
        element.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
        element.style.color =
          colorScheme === 'light' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)';
      }
    });
  };

  return (
    <Paper shadow="xs" p="lg" radius="lg" mt="sm">
      <Title order={3} mb="xl">
        Type : Highlight
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
          setTitle(item);
        }}
        index={0}
      />
      <Stack mt="md">
        <Stack>
          <InputLabel>Main Text to be highlighted.</InputLabel>
          <RichTextEditorComponent
            content={mainText}
            setContent={(item) => {
              setMainText(item);
            }}
            index={0}
          />
          {/* <Textarea
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
            placeholder="Main Text"
            autosize
            minRows={2}
            w="100%"
          /> */}
        </Stack>
        <Space h="lg" />
        <Group>
          <div className="content" ref={contentRef} dangerouslySetInnerHTML={{ __html: toSend }} />
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
        dataTunnel={() => ({ ...dataTunnel, options: toSend, title, points, explanation, correct })}
        response={response}
        setResponse={setResponse}
      />
    </Paper>
  );
};
