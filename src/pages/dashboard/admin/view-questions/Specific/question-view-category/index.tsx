import {
  Button,
  Checkbox,
  Group,
  OptionsDropdown,
  Paper,
  Radio,
  Select,
  Space,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { p } from 'msw/lib/core/GraphQLHandler-Cu4Xvg4S';
import React, { useEffect, useRef, useState } from 'react';
import css from '@/pages/dashboard/everything.module.css';

const QuestionViewWithModes = ({ mode, data }) => {
  switch (data.kind) {
    case 'Select One':
      return <SelectOnewithModes data={data} mode={mode} />;
    case 'Grid and Matrix':
      return <MatrixNGridwithModes data={data} mode={mode} />;
    case 'Highlight':
      return <HighlightwithModes data={data} mode={mode} />;
    case 'Extended Dropdown':
      return <ExtDropDownwithModes data={data} mode={mode} />;
    case 'Drag and Drop':
      return <DragNDropwithModes data={data} mode={mode} />;
    case 'Bowtie':
      return <BowTiewithModes data={data} mode={mode} />;
    case 'Select all that apply':
      return <McqwithModes data={data} mode={mode} />;
    default:
      return null;
  }
};
export default QuestionViewWithModes;

const SelectOnewithModes = ({ data, mode }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  return (
    <Stack gap="lg">
      <div dangerouslySetInnerHTML={{ __html: data.title }} className={css.htmlContentDisplay} />

      <Title order={3}>Options</Title>

      <Stack gap="sm">
        {data.options.map((option, index) => {
          return (
            <Group>
              <Radio checked={data.correct.includes(index)} /> <Text>{option.value}</Text>
            </Group>
          );
        })}
      </Stack>

      {!showExplanation ? (
        <Group>
          <Button onClick={() => setShowExplanation(!showExplanation)}>Submit</Button>
        </Group>
      ) : (
        <Stack>
          <Title order={2}> Explanation</Title>
          <div
            dangerouslySetInnerHTML={{ __html: data.explanation }}
            className={css.htmlContentDisplay}
          />
        </Stack>
      )}
    </Stack>
  );
};

const MatrixNGridwithModes = ({ data, mode }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  return (
    <Stack gap="lg">
      <div dangerouslySetInnerHTML={{ __html: data.title }} />

      <Stack gap="sm" mt="md">
        <Table verticalSpacing="lg">
          <Table.Thead>
            <Table.Tr ta="center">
              {data.options.head.map((head) => (
                <Table.Td>
                  <Text> {head}</Text>
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.options.rows.map((rowName, indexR) => (
              <Table.Tr key={indexR} ta="center">
                <Table.Td>
                  <Text>{rowName}</Text>
                </Table.Td>
                {data.options.head.map(
                  (head, index) =>
                    index > 0 && (
                      <Table.Td
                        key={index}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {data.radio === true ? (
                          <Group justify="center">
                            <Radio
                              type="radio"
                              name={`selectOptions${indexR}`}
                              checked={
                                data.correct.filter(
                                  (n) => n.key == rowName && n.values.includes(head)
                                ).length == 1
                              }
                            />
                          </Group>
                        ) : (
                          <Group justify="center">
                            <Checkbox
                              type="checkbox"
                              name={`selectOptions${indexR}`}
                              checked={
                                data.correct.filter(
                                  (n) => n.key == rowName && n.values.includes(head)
                                ).length == 1
                              }
                            />
                          </Group>
                        )}
                      </Table.Td>
                    )
                )}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>

      {!showExplanation ? (
        <Group>
          <Button onClick={() => setShowExplanation(!showExplanation)}>Submit</Button>
        </Group>
      ) : (
        <Stack>
          <Title order={2}> Explanation</Title>
          <div
            dangerouslySetInnerHTML={{ __html: data.explanation }}
            className={css.htmlContentDisplay}
          />
        </Stack>
      )}
    </Stack>
  );
};

const HighlightwithModes = ({ data, mode }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null); // To reference the content div

  useEffect(() => {
    const elements = contentRef?.current.querySelectorAll('.highlight');
    elements.forEach((element, index) => {
      // element.onclick = () => handleClick(element.innerText, index);
      element.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
      element.style.display = 'inline';
      element.style.cursor = 'pointer';
      const found = data.correct.findIndex((item) => item.value === element.innerText);
      if (found !== -1) {
        element.style.backgroundColor = 'yellow';
        element.style.color = 'black';
      }
    });
  });

  // const handleClick = (text, index) => {
  //   const newCorrect = correct;
  //   const found = newCorrect.findIndex((item) => item.text === text);
  //   if (found === -1) {
  //     newCorrect.push({ text, index });
  //   } else {
  //     newCorrect.splice(found, 1);
  //   }
  //   setCorrect(newCorrect);

  //   const elements = contentRef.current.querySelectorAll('.highlight');
  //   elements.forEach((element, i) => {
  //     if (newCorrect.findIndex((item) => item.index === i) !== -1) {
  //       element.style.backgroundColor = 'yellow';
  //       element.style.color = 'black';
  //     } else {
  //       // translucent yellow
  //       element.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
  //       element.style.color =
  //         colorScheme === 'light' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)';
  //     }
  //   });
  // };
  return (
    <Stack gap="lg">
      <div dangerouslySetInnerHTML={{ __html: data.title }} className={css.htmlContentDisplay} />
      <Group>
        <div
          // className="content"
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: data.options }}
          // className={css.htmlContentDisplay}
        />
      </Group>
      {!showExplanation ? (
        <Group>
          <Button onClick={() => setShowExplanation(!showExplanation)}>Submit</Button>
        </Group>
      ) : (
        <Stack>
          <Title order={2}> Explanation</Title>
          <div
            dangerouslySetInnerHTML={{ __html: data.explanation }}
            className={css.htmlContentDisplay}
          />
        </Stack>
      )}
    </Stack>
  );
};

const ExtDropDownwithModes = ({ data, mode }) => {
  const [showExplanation, setShowExplanation] = useState(false);

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
  const groupedOptions = groupOptions(data.options);

  return (
    <Stack gap="lg">
      <div dangerouslySetInnerHTML={{ __html: data.title }} className={css.htmlContentDisplay} />
      <Stack gap="sm">
        {groupedOptions.map((group, groupIndex) => (
          <Group key={groupIndex} gap="0px">
            {group.map((option) =>
              option.type === 'text' ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: option.value }}
                    key={option.id}
                    className={css.htmlContentDisplay}
                  />
                  &#160;
                </>
              ) : option.type === 'dropdown' ? (
                <>
                  <Select
                    data={option.value.map((o) => ({
                      value: o,
                      label: o,
                      disabled: mode == 'admin' ? true : false,
                    }))}
                    key={option.id}
                    defaultValue={data.correct.find((c) => c.id === option.id).value}
                  />
                  &#160;&#160;
                </>
              ) : null
            )}
          </Group>
        ))}
      </Stack>

      {!showExplanation ? (
        <Group>
          <Button onClick={() => setShowExplanation(!showExplanation)}>Submit</Button>
        </Group>
      ) : (
        <Stack>
          <Title order={2}> Explanation</Title>
          <div
            dangerouslySetInnerHTML={{ __html: data.explanation }}
            className={css.htmlContentDisplay}
          />
        </Stack>
      )}
    </Stack>
  );
};

const McqwithModes = ({ data, mode }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <Stack gap="lg">
      <div dangerouslySetInnerHTML={{ __html: data.title }} className={css.htmlContentDisplay} />

      <Title order={3}>Options</Title>

      <Stack gap="sm">
        {data.options.map((option, index) => {
          return (
            <Group>
              <Checkbox checked={data.correct.includes(index)} /> <Text>{option.value}</Text>
            </Group>
          );
        })}
      </Stack>
      {!showExplanation ? (
        <Group>
          <Button onClick={() => setShowExplanation(!showExplanation)}>Submit</Button>
        </Group>
      ) : (
        <Stack>
          <Title order={2}> Explanation</Title>
          <div
            dangerouslySetInnerHTML={{ __html: data.explanation }}
            className={css.htmlContentDisplay}
          />
        </Stack>
      )}
    </Stack>
  );
};

const DragNDropwithModes = ({ data, mode }) => {
  console.log(data);
  // Function to render the content with answers in place
  const [showExplanation, setShowExplanation] = useState(false);

  const renderContent = () => {
    if (!data.options?.title) return null;

    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data.options.title;

    // Function to process nodes and replace drop-containers
    const processNodes = (parentElement) => {
      return Array.from(parentElement.childNodes).map((node, index) => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Text node
          return <span key={index}>{node.textContent}</span>;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.classList.contains('drop-container')) {
            // Drop zone element
            const containerId = node.getAttribute('data-id');

            const correctAnswer = data.correct.find((answer) => answer.containerId === containerId);

            return (
              <div
                key={index}
                style={{
                  border: '2px solid #4CAF50',
                  display: 'inline-block',
                  backgroundColor: '#E8F5E9',
                  padding: '10px',
                  width: '300px',
                  minHeight: '40px',
                  borderRadius: '5px',
                  margin: '2px 5px',
                }}
              >
                {correctAnswer?.value || 'notfound'}
              </div>
            );
          } else {
            // Other HTML elements (like <p>)
            return (
              // <node.tagName.toLowerCase() key={index}>
              //   {processNodes(node)}
              // </node.tagName.toLowerCase()>
              processNodes(node)
            );
          }
        }
        return null;
      });
    };

    return <div>{processNodes(tempDiv)}</div>;
  };

  return (
    <Stack gap="lg">
      <div dangerouslySetInnerHTML={{ __html: data.title }} className={css.htmlContentDisplay} />

      {/* Main Content with Answers */}

      {renderContent()}

      {/* All Options */}
      <Stack w="350px" style={{ border: '1px solid #ccc', borderRadius: '10px' }} mt="50px">
        <Group
          justify="center"
          className="bg-blue-100"
          h="50px"
          style={{ borderRadius: '10px 10px 0px 0px' }}
        >
          <Text fw={600}>All Options</Text>
        </Group>

        <Stack p="md" gap="sm">
          {data.options?.dragables?.map((item) => (
            <Group
              key={item.id}
              p="sm"
              bg="gray.2"
              style={{
                borderRadius: '5px',
                border: data.correct.some((c) => c.textId === item.id)
                  ? '2px solid #4CAF50'
                  : '1px solid #ddd',
              }}
            >
              <Text>{item.value}</Text>
              {data.correct.some((c) => c.textId === item.id) && (
                <Text size="25px" c="green" ml="auto">
                  ✓
                </Text>
              )}
            </Group>
          ))}
        </Stack>
      </Stack>

      {!showExplanation ? (
        <Group>
          <Button onClick={() => setShowExplanation(!showExplanation)}>Submit</Button>
        </Group>
      ) : (
        <Stack>
          <Title order={2}> Explanation</Title>
          <div
            dangerouslySetInnerHTML={{ __html: data.explanation }}
            className={css.htmlContentDisplay}
          />
        </Stack>
      )}
    </Stack>
  );
};

const BowTiewithModes = ({ data, mode }) => {
  console.log(data);
  const [showExplanation, setShowExplanation] = useState(false);

  const DropZone = ({ id, content, preText }) => (
    <Paper
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
      withBorder={
        columnType === 'center'
          ? data.correct.center.id === item.id
            ? true
            : false
          : data.correct[columnType].find((c) => c.id === item.id)
            ? true
            : false
      }
      style={{ cursor: 'move', borderWidth: '3px', borderColor: 'green' }}
    >
      <Group justify="space-between">
        <Text size="sm" c={columnType.includes('center') ? 'black' : 'white'} fw={500}>
          {item.value}
        </Text>
        {columnType === 'center' ? (
          data.correct.center.id === item.id ? (
            <Text size="25px" c="black">
              ✓
            </Text>
          ) : (
            false
          )
        ) : data.correct[columnType].find((c) => c.id === item.id) ? (
          <Text size="25px" c="white">
            ✓
          </Text>
        ) : (
          false
        )}
        {/* {item.lifted ? (
          <Text size="sm" c="red">
            ✗
          </Text>
        ) : (
          <Text size="sm" c="green">
            ✓
          </Text>
        )} */}
      </Group>
    </Paper>
  );

  const WordChoices = ({ title, items, columnType }) => (
    <Paper shadow="xs" p="md" w={210} radius="md">
      <Group justify="center" mb="sm">
        <Title order={5}>{title}</Title>
      </Group>
      <Stack gap="xs">
        {items
          .filter((item) => !item.lifted)
          .map((item) => (
            <DraggableItem key={item.id} item={item} columnType={columnType} />
          ))}
      </Stack>
    </Paper>
  );
  return (
    <Stack gap="lg">
      <div dangerouslySetInnerHTML={{ __html: data.title }} className={css.htmlContentDisplay} />

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
              <DropZone
                id="topLeft"
                content={data.correct.left[0].value}
                preText={data.options.preDropText.left}
              />
            </Paper>
            <Paper pos="absolute" bottom={15} left={15} w="35%" h="20%">
              <DropZone
                id="bottomLeft"
                content={data.correct.left[1].value}
                preText={data.options.preDropText.left}
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
                content={data.correct.center.value}
                preText={data.options.preDropText.center}
              />
            </Paper>
            <Paper pos="absolute" top={15} right={15} w="35%" h="20%">
              <DropZone
                id="topRight"
                content={data.correct.right[0].value}
                preText={data.options.preDropText.right}
              />
            </Paper>
            <Paper pos="absolute" bottom={15} right={15} w="35%" h="20%">
              <DropZone
                id="bottomRight"
                content={data.correct.right[1].value}
                preText={data.options.preDropText.right}
              />
            </Paper>
          </Paper>
          <Group align="flex-start" justify="space-between" gap="xl">
            <WordChoices
              title={data.options.columnTitles.left}
              items={data.options.left}
              columnType="left"
            />

            <WordChoices
              title={data.options.columnTitles.center}
              items={data.options.center}
              columnType="center"
            />

            <WordChoices
              title={data.options.columnTitles.right}
              items={data.options.right}
              columnType="right"
            />
          </Group>
        </Stack>
      </Group>
      {!showExplanation ? (
        <Group>
          <Button onClick={() => setShowExplanation(!showExplanation)}>Submit</Button>
        </Group>
      ) : (
        <Stack>
          <Title order={2}> Explanation</Title>
          <div
            dangerouslySetInnerHTML={{ __html: data.explanation }}
            className={css.htmlContentDisplay}
          />
        </Stack>
      )}
    </Stack>
  );
};