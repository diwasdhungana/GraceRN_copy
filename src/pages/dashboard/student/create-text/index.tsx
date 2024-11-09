import { useCreateTest, useGetSubjects, useGetSystems } from '@/hooks';
import React from 'react';
import css from '@/pages/dashboard/everything.module.css';
import { Page } from '@/components/page';
import {
  Button,
  Checkbox,
  Divider,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { PiArrowLeft } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/routes';

const index = () => {
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);
  const [selectedSystems, setSelectedSystems] = React.useState<string[]>([]);
  const [selectedGen, setSelectedGen] = React.useState<string[]>([]);
  const [selectedModes, setSelectedModes] = React.useState<string[]>([]);
  const [questionsCount, setQuestionsCount] = React.useState(40);
  const { data: subjectsData, isError: subjectsError } = useGetSubjects({
    query: { getAll: true },
  });
  const { data: systemsData, isError: systemsDataError } = useGetSystems({
    query: {
      getAll: true,
      subjects: selectedSubjects,
    },
  });

  const questionGen = [
    { label: 'Traditional', value: 'Traditional' },
    { label: 'Next Gen', value: 'Next Gen' },
  ];
  const questionMode = [
    { label: 'correct', value: 'Correct' },
    { label: 'Incorrect', value: 'Incorrect' },
  ];
  const { mutate: createTest, isPending } = useCreateTest();
  const handleCreateTest = () => {
    //filter out all the systems that are not currently present in systemData.data.docs
    const newSystems = selectedSystems.filter((system) =>
      systemsData?.data?.docs.find((s: { _id: String }) => s._id === system)
    );
    createTest(
      {
        variables: {
          types: selectedGen,
          systems: newSystems,
          modes: selectedModes,
          questionsCount,
        },
      },
      {
        onSuccess: (data) => {
          // console.log(data);
          setTimeout(() => {
            navigate(paths.dashboard.student.attemptTest.root);
          }, 2000);
        },
        onError: (error: String) => {
          console.log(error);
        },
      }
    );
  };
  return (
    <Page title="New Test" className={css.root}>
      <Stack>
        <Group gap="xl">
          <Button variant="subtle" onClick={() => navigate(-1)}>
            <PiArrowLeft size="xl" strokeWidth={10} /> {'  '}
            <Title order={3} mx="sm">
              Home Page
            </Title>
          </Button>
        </Group>
      </Stack>
      <Paper shadow="xs" p="lg" radius="lg">
        <Stack ml="md">
          <Title order={2}>New test</Title>
          <Group>
            <Text fw={700} size="lg">
              Gen :{' '}
            </Text>{' '}
            <Group>
              {' '}
              {questionGen.map((gen) => (
                <Group key={gen.value}>
                  <Checkbox
                    checked={selectedGen?.includes(gen.value)}
                    onChange={() => {
                      if (selectedGen?.includes(gen.value)) {
                        setSelectedGen(selectedGen.filter((g) => g !== gen.value));
                      } else {
                        setSelectedGen([...selectedGen, gen.value]);
                      }
                    }}
                  />

                  <Text>{gen.label}</Text>
                </Group>
              ))}
            </Group>
            <Divider my="md" bg="red" w="100%" />
          </Group>
          {subjectsData?.data?.docs && (
            <Group>
              <Text fw={700} size="lg">
                Subjects :
              </Text>{' '}
              <Group>
                {subjectsData?.data?.docs.map((subject: { _id: string; name: string }) => (
                  <Group key={subject._id}>
                    <Checkbox
                      checked={selectedSubjects?.includes(subject._id)}
                      onChange={() => {
                        if (selectedSubjects?.includes(subject._id)) {
                          setSelectedSubjects(selectedSubjects.filter((g) => g !== subject._id));
                        } else {
                          setSelectedSubjects([...selectedSubjects, subject._id]);
                        }
                      }}
                    />
                    <Text>{subject.name}</Text>
                  </Group>
                ))}
              </Group>
            </Group>
          )}
          <Divider my="md" bg="red" w="100%" />
          {!systemsDataError && (
            <Group>
              <Text fw={700} size="lg">
                Systems :
              </Text>{' '}
              <Group>
                {selectedSubjects.length > 0 &&
                  systemsData?.data?.docs.map((system: { _id: string; name: string }) => (
                    <Group key={system._id}>
                      <Checkbox
                        checked={selectedSystems?.includes(system._id)}
                        onChange={() => {
                          if (selectedSystems?.includes(system._id)) {
                            setSelectedSystems(selectedSystems.filter((g) => g !== system._id));
                          } else {
                            setSelectedSystems([...selectedSystems, system._id]);
                          }
                        }}
                      />
                      <Text>{system.name}</Text>
                    </Group>
                  ))}
              </Group>
            </Group>
          )}
          <Divider my="md" bg="red" w="100%" />

          <Group>
            <Text fw={700} size="lg">
              Mode :{' '}
            </Text>{' '}
            <Group>
              {' '}
              {questionMode.map((mode) => (
                <Group key={mode.value}>
                  <Checkbox
                    checked={selectedModes?.includes(mode.value)}
                    onChange={() => {
                      if (selectedModes?.includes(mode.value)) {
                        setSelectedModes(selectedModes.filter((g) => g !== mode.value));
                      } else {
                        setSelectedModes([...selectedModes, mode.value]);
                      }
                    }}
                  />

                  <Text>{mode.label}</Text>
                </Group>
              ))}
            </Group>
          </Group>
          <Divider my="md" bg="red" w="100%" />
          <Group>
            <Text fw={700} size="lg">
              Number of Questions :{' '}
            </Text>{' '}
            <NumberInput
              value={questionsCount}
              onChange={(value) => setQuestionsCount(Number(value))}
              min={5}
              max={85}
            />
            <Text fw={200}>(5-85)</Text>
          </Group>
          <Group>
            <Button
              size="lg"
              color="blue"
              radius="xl"
              disabled={
                selectedGen.length == 0 ||
                selectedSystems.length == 0 ||
                selectedSubjects.length == 0 ||
                selectedModes.length == 0
              }
              onClick={handleCreateTest}
            >
              Create Test
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Page>
  );
};

export default index;
