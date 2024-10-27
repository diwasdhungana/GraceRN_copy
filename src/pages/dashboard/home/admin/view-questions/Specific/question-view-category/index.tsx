import { Button, Checkbox, Group, Select, Space, Stack, Text, Title } from '@mantine/core';
import React, { useState } from 'react';

const QuestionViewWithModes = ({ mode, data }) => {
  switch (data.kind) {
    case 'Select One':
      return <SelectOnewithModes data={data} mode={mode} />;
    case 'matrixNGridBool':
      return <MatrixNGridBoolwithModes data={data} mode={mode} />;
    case 'matrixNGridMult':
      return <MatrixNGridMultwithModes data={data} mode={mode} />;
    case 'highlight':
      return <HighlightwithModes data={data} mode={mode} />;
    case 'Extended Dropdown':
      return <ExtDropDownwithModes data={data} mode={mode} />;
    case 'dragNDrop':
      return <DragNDropwithModes data={data} mode={mode} />;
    case 'bowTie':
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

const MatrixNGridBoolwithModes = ({ data, mode }) => {
  return (
    <div>
      {data.title}
      {mode}
    </div>
  );
};

const MatrixNGridMultwithModes = ({ data, mode }) => {
  return (
    <div>
      {data.title}
      {mode}
    </div>
  );
};

const HighlightwithModes = ({ data, mode }) => {
  return (
    <div>
      {data.title}
      {mode}
    </div>
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
      <Stack gap="0px">
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
