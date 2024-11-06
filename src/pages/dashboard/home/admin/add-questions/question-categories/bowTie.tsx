import React, { useState } from 'react';
import {
  Button,
  Group,
  InputLabel,
  NumberInput,
  Paper,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { RichTextEditorComponent } from '../utils/RichTextEditorComponent';
import { generateId } from '@/utilities/uid';

export const BowTie = ({ dataTunnel, response, setResponse }) => {
  const titleRef = React.useRef(null);
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [points, setPoints] = useState(5);

  // State for drag items in each column
  const [leftItems, setLeftItems] = useState([
    { id: generateId(), text: 'Left Option 1', lifted: false },
    { id: generateId(), text: 'Left Option 2', lifted: false },
    { id: generateId(), text: 'Left Option 3', lifted: false },
  ]);

  const [centerItems, setCenterItems] = useState([
    { id: generateId(), text: 'Center Option 1', lifted: false },
    { id: generateId(), text: 'Center Option 2', lifted: false },
  ]);

  const [rightItems, setRightItems] = useState([
    { id: generateId(), text: 'Right Option 1', lifted: false },
    { id: generateId(), text: 'Right Option 2', lifted: false },
    { id: generateId(), text: 'Right Option 3', lifted: false },
  ]);
  const [wordChoiceTitles, setWordChoicesTitle] = useState({});
  // {
  //   left: 'Actions to Take',
  //   center: 'Potential Conditions',
  //   right: 'Parameters',
  // };

  // State for drop zones
  const [dropZones, setDropZones] = useState({
    topLeft: { id: 'topLeft', content: '', contentId: null, allowedColumn: 'left' },
    bottomLeft: { id: 'bottomLeft', content: '', contentId: null, allowedColumn: 'left' },
    center: { id: 'center', content: '', contentId: null, allowedColumn: 'center' },
    topRight: { id: 'topRight', content: '', contentId: null, allowedColumn: 'right' },
    bottomRight: { id: 'bottomRight', content: '', contentId: null, allowedColumn: 'right' },
  });

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData('object'));
    const columnType = e.dataTransfer.getData('columnType');

    if (dropZones[zoneId].allowedColumn !== columnType) {
      return;
    }

    setDropZones((prev) => {
      const newZones = { ...prev };
      const oldContentId = newZones[zoneId].contentId;

      if (oldContentId) {
        const setterMap = {
          left: setLeftItems,
          center: setCenterItems,
          right: setRightItems,
        };
        setterMap[columnType]((items) =>
          items.map((item) => (item.id === oldContentId ? { ...item, lifted: false } : item))
        );
      }

      newZones[zoneId] = {
        ...newZones[zoneId],
        content: draggedItem.text,
        contentId: draggedItem.id,
      };
      return newZones;
    });

    const setterMap = {
      left: setLeftItems,
      center: setCenterItems,
      right: setRightItems,
    };
    setterMap[columnType]((items) =>
      items.map((item) => (item.id === draggedItem.id ? { ...item, lifted: true } : item))
    );
  };

  const handleClear = (zoneId) => {
    const zone = dropZones[zoneId];
    if (!zone.contentId) return;

    const setterMap = {
      left: setLeftItems,
      center: setCenterItems,
      right: setRightItems,
    };

    setterMap[zone.allowedColumn]((items) =>
      items.map((item) => (item.id === zone.contentId ? { ...item, lifted: false } : item))
    );

    setDropZones((prev) => ({
      ...prev,
      [zoneId]: { ...prev[zoneId], content: '', contentId: null },
    }));
  };

  const DropZone = ({ id, content, preText }) => (
    <Paper
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, id)}
      onClick={() => handleClear(id)}
      bg={id.includes('Right') ? 'grape.1' : id.includes('Left') ? 'blue.1' : 'gray.1'}
      w="100%"
      h="100%"
      style={{ cursor: 'pointer' }}
    >
      <Group justify="center" align="center" h="100%">
        {content ? (
          <Paper
            w="90%"
            h="80%"
            bg={id.includes('Right') ? 'grape.5' : id.includes('Left') ? 'blue.5' : 'gray.4'}
            p="sm"
            radius="md"
          >
            <Stack align="center" justify="center" h="100%">
              <Text size="md" ta="center" c={id.includes('center') ? 'black' : 'white'} fw={500}>
                {content}
              </Text>
            </Stack>
          </Paper>
        ) : (
          <Stack align="center" justify="center" h="100%" p="sm">
            <Text size="sm" ta="center">
              {preText}
            </Text>
          </Stack>
        )}
      </Group>
    </Paper>
  );

  const DraggableItem = ({ item, columnType }) => (
    <Paper
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('object', JSON.stringify(item));
        e.dataTransfer.setData('columnType', columnType);
      }}
      bg={
        columnType.includes('right') ? 'grape.5' : columnType.includes('left') ? 'blue.5' : 'gray.4'
      }
      p="sm"
      mb="xs"
      style={{ cursor: 'move' }}
    >
      <Text size="sm">{item.text}</Text>
    </Paper>
  );

  const WordChoices = ({ title, items, setItems, columnType }) => (
    <Paper shadow="xs" p="md" w={200} radius="md">
      <Group justify="center" mb="sm">
        <TextInput
          ref={titleRef}
          value={title || 'add a title'}
          variant="Subtle"
          fw={700}
          onChange={(event) => {
            setWordChoicesTitle((prev) => ({ ...prev, [columnType]: event.target.value }));
            // I am talking about htis part here.
          }}
        />
      </Group>
      <Stack gap="xs">
        {items
          .filter((item) => !item.lifted)
          .map((item) => (
            <DraggableItem key={item.id} item={item} columnType={columnType} />
          ))}
      </Stack>
      <Button
        onClick={() =>
          setItems((prev) => [
            ...prev,
            {
              id: generateId(),
              text: `New ${columnType} option`,
              lifted: false,
            },
          ])
        }
        mt="md"
        fullWidth
      >
        Add Item
      </Button>
    </Paper>
  );

  return (
    <Paper shadow="xs" p="lg" radius="lg" mt="sm">
      <Title order={3} mb="xl">
        Bow Tie Diagram
      </Title>

      <Group>
        <NumberInput
          label="Points (1-20)"
          value={points}
          onChange={(val) => setPoints(val)}
          min={1}
          max={20}
        />
      </Group>

      <Stack mt="md">
        <InputLabel>Title</InputLabel>
        {response.titleError && <Text c="red">{response.titleError}</Text>}
        <RichTextEditorComponent content={title} setContent={setTitle} index={0} />
      </Stack>
      <Group justify="center" mt="xl">
        <Stack>
          <Paper pos="relative" w="45vw" h="40vh" p="xl" withBorder>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '30%',
                width: '3px',
                height: '40%',
                backgroundColor: '#339af0',
                transform: 'translate(-50%, -100%) rotate(-45deg)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '30%',
                width: '3px',
                height: '40%',
                backgroundColor: '#cc5de8',
                transform: 'translate(-50%, -100%) rotate(45deg)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '30%',
                width: '3px',
                height: '40%',
                backgroundColor: '#339af0',
                transform: 'translate(-50%, 0%) rotate(45deg)',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '30%',
                width: '3px',
                height: '40%',
                backgroundColor: '#cc5de8',
                transform: 'translate(-50%, 0%) rotate(-45deg)',
                zIndex: 0,
              }}
            />
            <Paper pos="absolute" top={15} left={15} w="35%" h="20%">
              <DropZone id="topLeft" content={dropZones.topLeft.content} preText="Action to Take" />
            </Paper>
            <Paper pos="absolute" bottom={15} left={15} w="35%" h="20%">
              <DropZone
                id="bottomLeft"
                content={dropZones.bottomLeft.content}
                preText="Action to Take"
              />
            </Paper>
            <Paper
              pos="absolute"
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              w="35%"
              h="20%"
            >
              <DropZone
                id="center"
                content={dropZones.center.content}
                preText="Condition most likely experiencing"
              />
            </Paper>
            <Paper pos="absolute" top={15} right={15} w="35%" h="20%">
              <DropZone
                id="topRight"
                content={dropZones.topRight.content}
                preText="Parameter to moniter"
              />
            </Paper>
            <Paper pos="absolute" bottom={15} right={15} w="35%" h="20%">
              <DropZone
                id="bottomRight"
                content={dropZones.bottomRight.content}
                preText="Parameter to monitor"
              />
            </Paper>
          </Paper>

          <Group align="flex-start" justify="space-between" gap="xl">
            <WordChoices
              title={wordChoiceTitles.left}
              items={leftItems}
              setItems={setLeftItems}
              columnType="left"
            />
            <WordChoices
              title={wordChoiceTitles.center}
              items={centerItems}
              setItems={setCenterItems}
              columnType="center"
            />
            <WordChoices
              title={wordChoiceTitles.right}
              items={rightItems}
              setItems={setRightItems}
              columnType="right"
            />
          </Group>
          <Group justify="center">
            <Button
              bg="red"
              w="200px"
              onClick={() => {
                const newleftItems = leftItems.map((item) => ({ ...item, lifted: false }));
                setLeftItems(newleftItems);
                const newCenterItems = centerItems.map((item) => ({ ...item, lifted: false }));
                setCenterItems(newCenterItems);
                const newRightItems = rightItems.map((item) => ({ ...item, lifted: false }));
                setRightItems(newRightItems);
                setDropZones({
                  topLeft: { id: 'topLeft', content: '', contentId: null, allowedColumn: 'left' },
                  bottomLeft: {
                    id: 'bottomLeft',
                    content: '',
                    contentId: null,
                    allowedColumn: 'left',
                  },
                  center: { id: 'center', content: '', contentId: null, allowedColumn: 'center' },
                  topRight: {
                    id: 'topRight',
                    content: '',
                    contentId: null,
                    allowedColumn: 'right',
                  },
                  bottomRight: {
                    id: 'bottomRight',
                    content: '',
                    contentId: null,
                    allowedColumn: 'right',
                  },
                });
              }}
            >
              Reset All
            </Button>
          </Group>
        </Stack>
      </Group>

      <Stack mt="xl">
        <InputLabel>Explanation</InputLabel>
        {response.explanationError && <Text c="red">{response.explanationError}</Text>}
        <RichTextEditorComponent content={explanation} setContent={setExplanation} index={0} />
      </Stack>

      <Space h="lg" />

      <Button
        onClick={() => {
          const data = {
            ...dataTunnel,
            options: {
              left: leftItems.map(({ id, text }) => ({ id, value: text })),
              center: centerItems.map(({ id, text }) => ({ id, value: text })),
              right: rightItems.map(({ id, text }) => ({ id, value: text })),
            },
            correct: {
              topLeft: { value: dropZones.topLeft.content, id: dropZones.topLeft.contentId },
              bottomLeft: {
                value: dropZones.bottomLeft.content,
                id: dropZones.bottomLeft.contentId,
              },
              center: { value: dropZones.center.content, id: dropZones.center.contentId },
              topRight: { value: dropZones.topRight.content, id: dropZones.topRight.contentId },
              bottomRight: {
                value: dropZones.bottomRight.content,
                id: dropZones.bottomRight.contentId,
              },
            },
            title,
            points,
            explanation,
          };
          dataTunnel(data);
        }}
      >
        Submit
      </Button>
    </Paper>
  );
};
