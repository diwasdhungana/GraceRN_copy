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
import React, { useEffect, useRef, useState } from 'react';

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
    case 'dragNDrop':
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
      <div dangerouslySetInnerHTML={{ __html: data.title }} />

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
          <div dangerouslySetInnerHTML={{ __html: data.explanation }} />
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
          <div dangerouslySetInnerHTML={{ __html: data.explanation }} />
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
      const found = data.correct.findIndex((item) => item.text === element.innerText);
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
      <div dangerouslySetInnerHTML={{ __html: data.title }} />
      <Group>
        <div
          className="content"
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: data.options }}
        />
      </Group>
      {!showExplanation ? (
        <Group>
          <Button onClick={() => setShowExplanation(!showExplanation)}>Submit</Button>
        </Group>
      ) : (
        <Stack>
          <Title order={2}> Explanation</Title>
          <div dangerouslySetInnerHTML={{ __html: data.explanation }} />
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
      <div dangerouslySetInnerHTML={{ __html: data.title }} />
      <Stack gap="sm">
        {groupedOptions.map((group, groupIndex) => (
          <Group key={groupIndex} gap="0px">
            {group.map((option) =>
              option.type === 'text' ? (
                <>
                  <div dangerouslySetInnerHTML={{ __html: option.value }} key={option.id} />
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
          <div dangerouslySetInnerHTML={{ __html: data.explanation }} />
        </Stack>
      )}
    </Stack>
  );
};

const DragNDropwithModes = ({ data, mode }) => {
  return (
    <div>
      {data.title}
      {mode}
    </div>
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
      <div dangerouslySetInnerHTML={{ __html: data.title }} />

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
          <div dangerouslySetInnerHTML={{ __html: data.explanation }} />
        </Stack>
      )}
    </Stack>
  );
};

export default QuestionViewWithModes;
