import { Page } from '@/components/page';
import { dummySubjects } from '@/utilities/dummysubjects';

import { Button, Group, Paper, Select, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { PiArrowLeft, PiBackspace } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSubjectContext, setSubjectContext } from '@/store/interactions';

export const BowTie = () => {
  const navigate = useNavigate();
  const subjects = dummySubjects;
  const dispatch = useDispatch();
  const [selectedSubject, setSelectedSubject] = React.useState('');
  const provider = useSelector((state: { provider: { subject: String } }) => state.provider);
  const setSubjectContextFunc = () => {
    setSubjectContext(provider, selectedSubject, dispatch);
  };
  const clearSubjectContextFunc = () => {
    clearSubjectContext(provider, null, dispatch);
  };
  const [contextSubject, setContextSubject] = React.useState(provider.subject);
  React.useEffect(() => {
    setContextSubject(provider.subject);
    console.log(provider.subject);
  }, [provider.subject]);

  return (
    <Page title="bow and tie">
      <Stack>
        <Group gap="xl">
          <Button variant="subtle" onClick={() => navigate(-1)}>
            <PiArrowLeft size="xl" /> {'  '}
            <Text size="lg"></Text>
          </Button>
        </Group>
        <Paper shadow="xs" p="lg" radius="lg">
          <Title order={2}>Add Bow and Tie Question</Title>
          <Group mt="xl" align="flex-end">
            <Select
              label={<Text fw="600">Choose a Subject</Text>}
              placeholder={
                contextSubject === null
                  ? 'Select a Subject'
                  : subjects?.find((subject) => subject._id === contextSubject)?.name ||
                    'Unknown Subject'
              }
              data={subjects.map((subject) => {
                return { value: subject._id, label: subject.name };
              })}
              onChange={(event) => {
                console.log(event);
                setSelectedSubject(event);
              }}
              disabled={contextSubject !== null}
            />
            {selectedSubject != '' &&
              (contextSubject === null ? (
                <Button onClick={setSubjectContextFunc}>Set Across Pages</Button>
              ) : (
                <Button onClick={clearSubjectContextFunc}>Reset Subject</Button>
              ))}
          </Group>
        </Paper>
      </Stack>
    </Page>
  );
};
