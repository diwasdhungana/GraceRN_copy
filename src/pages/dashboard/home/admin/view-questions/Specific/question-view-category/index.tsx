import {
  Button,
  Checkbox,
  Group,
  OptionsDropdown,
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
    case 'BowTie':
      return <BowTiewithModes data={data} mode={mode} />;
    case 'Select all that apply':
      return <McqwithModes data={data} mode={mode} />;
    default:
      return null;
  }
};

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
              {Array.from({ length: data.options[0].length }).map((_, index) => (
                <th key={index} style={{ textAlign: 'center' }}>
                  <Text>{data.options[0][index].value}</Text>
                </th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {Array.from({ length: data.options.length - 1 }).map((_, indexR) => (
              <Table.Tr key={indexR}>
                {Array.from({ length: data.options[0].length }).map((_, index) => (
                  <Table.Td
                    key={index}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {index === 0 ? (
                      <Text>{data.options[indexR + 1][index].value}</Text>
                    ) : data.radio === true ? (
                      <Group justify="center">
                        <Radio
                          type="radio"
                          name={`selectOptions${indexR}`}
                          checked={
                            mode == 'admin'
                              ? //see if the data.correct [[],[2],[1,3]]
                                data.correct[indexR + 1].includes(index)
                                ? true
                                : false
                              : true
                          }
                        />
                      </Group>
                    ) : (
                      <Group justify="center">
                        <Checkbox
                          type="checkbox"
                          name={`selectOptions${indexR}`}
                          checked={
                            mode == 'admin'
                              ? //see if the data.correct [[],[2],[1,3]]
                                data.correct[indexR + 1].includes(index)
                                ? true
                                : false
                              : true
                          }
                        />
                      </Group>
                    )}
                  </Table.Td>
                ))}
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
    const elements = contentRef.current.querySelectorAll('.highlight');
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

const DragNDropwithModes = ({ data, mode }) => {
  console.log(data);
  // Function to render the content with answers in place
  const [showExplanation, setShowExplanation] = useState(false);

  const renderContent = () => {
    if (!data.options?.text) return null;

    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data.options.text;

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
                  display: 'inline',
                  backgroundColor: '#E8F5E9',
                  padding: '10px',
                  width: '300px',
                  minHeight: '40px',
                  borderRadius: '5px',
                  margin: '0 5px',
                }}
              >
                {correctAnswer?.text || ''}
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
      {/* Header */}
      <Group justify="space-between" align="center">
        <Title order={3}>Drag and Drop Question</Title>
        <Text fw={500}>Points: {data.points}</Text>
      </Group>

      {/* Title/Question */}
      <div>
        <Text fw={500} size="lg" mb="xs">
          Question:
        </Text>
        <div dangerouslySetInnerHTML={{ __html: data.title }} className={css.htmlContentDisplay} />
      </div>

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
          {data.options?.values?.map((item) => (
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
              <Text>{item.text}</Text>
              {data.correct.some((c) => c.textId === item.id) && (
                <Text size="xl" c="green" ml="auto">
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
  return (
    <div>
      {data.title}
      {mode}
    </div>
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

export default QuestionViewWithModes;
