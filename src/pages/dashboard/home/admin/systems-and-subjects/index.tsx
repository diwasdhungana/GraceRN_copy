import { Page } from '@/components/page';
import {
  Box,
  Button,
  Group,
  Paper,
  Radio,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useEffect } from 'react';
import css from '@/pages/dashboard/everything.module.css';
import { useNavigate } from 'react-router-dom';
import { PiArrowLeft } from 'react-icons/pi';
import { useGetSubjects, useGetSystems, usePostSystem, usePostSubject } from '@/hooks';
const subjectAndSystems = () => {
  const { data: subjects, isError: subjectsError } = useGetSubjects({ query: { getAll: true } });
  const { data: systemsData, isError: systemsDataError } = useGetSystems({
    query: { getAll: true },
  });
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = React.useState();
  const [selectedSystem, setSelectedSystem] = React.useState();
  const [subjectName, setSubjectName] = React.useState('');
  const [systemName, setSystemName] = React.useState('');
  const { mutate: postSubject, isPending: postSubjectPending } = usePostSubject();
  const { mutate: postSystem, isPending: postSystemPending } = usePostSystem();
  const handleAddSubject = () => {
    // Split the subject name by comma and remove any empty strings, output in this format [{name: 'subject1'}, {name: 'subject2'}]
    const subjects = subjectName
      .split(',')
      .filter(Boolean)
      .map((name) => ({ name }));
    postSubject(
      { variables: subjects },
      {
        onSuccess: () => {
          setSubjectName('');
        },
        onError: (e) => {
          console.log('Error', e);
        },
      }
    );
  };
  const handleAddSystem = () => {
    // Split the system name by comma and remove any empty strings, output in this format [{name: 'system1'}, {name: 'system2'}]
    const systems = systemName
      .split(',')
      .filter(Boolean)
      .map((name) => ({ name }));
    postSystem(
      { variables: systems },
      {
        onSuccess: () => {
          setSystemName('');
        },
        onError: (e) => {
          console.log('Error', e);
        },
      }
    );
  };

  return (
    <Page title="Home" className={css.root}>
      <Stack>
        <Group gap="xl">
          <Button variant="subtle" onClick={() => navigate(-1)}>
            <PiArrowLeft size="xl" strokeWidth={10} /> {'  '}
            <Title order={3} mx="sm">
              Admin Page
            </Title>
          </Button>
        </Group>
        <Paper shadow="xs" p="lg" radius="lg">
          <Stack ml="md">
            <Title order={2}>View/Add Subjects and Systems</Title>

            <Group gap="80px" mt="40px">
              <Stack>
                {subjectsError && <Text c="red">Error fetching subjects</Text>}
                <Select
                  label={<Text fw="600">Available Subject</Text>}
                  placeholder={'View Subjects'}
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
                  w="300px"
                />
              </Stack>
              <Stack>
                {systemsDataError && <Text c="red">Error fetching systems</Text>}

                <Select
                  label={<Text fw="600">Available System</Text>}
                  placeholder={'View Systems'}
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
                  w="300px"
                />
              </Stack>
            </Group>
            <Group mt="20px" gap="80px">
              <TextInput
                label="Add a Subject"
                value={subjectName}
                placeholder="Enter Subject Name"
                onChange={(e) => setSubjectName(e.currentTarget.value)}
                w="300px"
              />

              <TextInput
                label="Add a System"
                value={systemName}
                placeholder="Enter System Name"
                onChange={(e) => setSystemName(e.currentTarget.value)}
                w="300px"
              />
            </Group>
          </Stack>
          <Stack>
            <Group mt="20px" gap="80px">
              <Group w="300px" justify="center">
                <Button
                  color="blue"
                  onClick={handleAddSubject}
                  disabled={postSubjectPending || !subjectName}
                  loading={postSubjectPending}
                >
                  Add Subject
                </Button>
              </Group>
              <Group w="300px" justify="center">
                <Button
                  color="blue"
                  onClick={handleAddSystem}
                  disabled={postSystemPending || !systemName}
                  loading={postSystemPending}
                >
                  Add System
                </Button>
              </Group>
            </Group>
            <span>
              <Text size="sm">
                {' '}
                You can add multiple data at once by seperating name with comma
              </Text>
              <Text size="sm">
                {' '}
                eg: enter "Mental Health, Fundamentals, Child Health" in subject field.{' '}
              </Text>
            </span>
          </Stack>
        </Paper>
      </Stack>
    </Page>
  );
};

export default subjectAndSystems;
