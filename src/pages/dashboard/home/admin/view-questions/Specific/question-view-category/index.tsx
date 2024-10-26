import { Button, Checkbox, Group, Space, Stack, Text, Title } from '@mantine/core';
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
    case 'extDropDown':
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
  return (
    <div>
      {data.title}
      {mode}
    </div>
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
