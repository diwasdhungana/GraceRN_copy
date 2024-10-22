import { Page } from '@/components/page';
import { Button, Group, Paper, Radio, Select, Stack, Text, Title } from '@mantine/core';
import React, { useEffect } from 'react';
import css from '@/pages/dashboard/everything.module.css';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/routes';

import { Settings } from '@/pages/dashboard/home/admin/question-categories/utils/settings';

import { PiArrowLeft } from 'react-icons/pi';
import { dummySubjects, dummySystems } from '@/utilities/dummysubjects';
import { useGetSubjects, useGetSystems } from '@/hooks';

const questionTypewithlabelandValue = {
  nextgen: [
    { label: 'Extended Drop Down', value: 'extDropDown' },
    { label: 'Highlight', value: 'Highlight' },
    { label: 'Matrix and Grid Two values', value: 'matrixNGridBool' },
    { label: 'Matrix and Grid Multi values', value: 'matrixNGridMult' },
    { label: 'Drag and Drop', value: 'dragNDrop' },
    { label: 'Bow Tie', value: 'bowTie' },
  ],
  traditional: [
    { label: 'Select One', value: 'selectOne' },
    { label: 'Multiple Choice Question', value: 'mcq' },
  ],
};
const questionGen = [
  { label: 'Traditional', value: 'traditional' },
  { label: 'Next Gen', value: 'nextgen' },
];
const addQuestions = () => {
  const { data: subjects, isError: subjectsError } = useGetSubjects();
  const { data: systemsData, isError: systemsDataError } = useGetSystems();

  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = React.useState();
  const [selectedSystem, setSelectedSystem] = React.useState();
  const [selectedGen, setSelectedGen] = React.useState();
  const [selectedQuestionType, setSelectedQuestionType] = React.useState(
    questionTypewithlabelandValue.traditional[0].value
  );
  const [response, setResponse] = React.useState({});

  return (
    <Page title="Home" className={css.root}>
      <Stack>
        <Group gap="xl">
          <Button variant="subtle" onClick={() => navigate(-1)}>
            <PiArrowLeft size="xl" /> {'  '}
            <Text size="lg"></Text>
          </Button>
        </Group>
        <Paper shadow="xs" p="lg" radius="lg">
          <Stack ml="md">
            <Title order={2}>Create a Question.</Title>
            {response && response.name}
            <Group mt="xl">
              <Radio.Group
                name="Question Generation"
                label={<Text fw="600">Select Question Generation</Text>}
                onChange={(value) => setSelectedGen(value)}
              >
                <Group mt="xs">
                  {questionGen.map((gen) => {
                    return (
                      <Radio
                        key={gen.value}
                        value={gen.value}
                        label={gen.label}
                        checked={selectedGen === gen.value}
                      />
                    );
                  })}
                </Group>
              </Radio.Group>
            </Group>
            <Group>
              <Stack>
                {subjectsError && <Text c="red">Error fetching subjects</Text>}
                <Select
                  label={<Text fw="600">Choose a Subject</Text>}
                  placeholder={'Select Subjects'}
                  data={subjects?.data?.docs?.map((subject) => {
                    return { value: subject._id, label: subject.name };
                  })}
                  onChange={(value) => setSelectedSubject(value)}
                  value={selectedSubject}
                  allowDeselect={false}
                  searchable
                  nothingFoundMessage="No such subjects."
                  maxDropdownHeight={200}
                  comboboxProps={{ withinPortal: false }}
                />
              </Stack>
              <Stack>
                {systemsDataError && <Text c="red">Error fetching subjects</Text>}

                <Select
                  label={<Text fw="600">Choose a System</Text>}
                  placeholder={'Select Subjects'}
                  data={systemsData?.data?.docs?.map((subject) => {
                    return { value: subject._id, label: subject.name };
                  })}
                  onChange={(value) => setSelectedSystem(value)}
                  value={selectedSystem}
                  allowDeselect={false}
                  searchable
                  nothingFoundMessage="No such systems."
                  maxDropdownHeight={200}
                  comboboxProps={{ withinPortal: false }}
                />
              </Stack>
            </Group>
            <Group>
              <Select
                data={questionTypewithlabelandValue[selectedGen]}
                placeholder="select a question type"
                label={<Text fw="600">Choose a Question Type</Text>}
                onChange={(value) => setSelectedQuestionType(value)}
                allowDeselect={false}
              />
            </Group>
            {/* main Page starts from here */}
          </Stack>
        </Paper>
        {selectedQuestionType && selectedGen && selectedSubject && (
          <>
            <Settings
              dataTunnel={{
                selectedQuestionType,
                selectedGen,
                selectedSubject,
                selectedSystem,
              }}
              response={response}
              setResponse={setResponse}
            />
          </>
        )}
      </Stack>
    </Page>
  );
};

export default addQuestions;