import { useGetMyTests } from '@/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import css from '@/pages/dashboard/everything.module.css';
import { Page } from '@/components/page';
import { Button, Divider, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { PiArrowLeft } from 'react-icons/pi';
import TestOutlineComponent from './testOutlineComponent';
import { paths } from '@/routes';

const index = () => {
  const navigate = useNavigate();
  const [inTest, setInTest] = React.useState(false);
  const [testCompleted, setTestCompleted] = React.useState(false);
  const {
    data: activeTests,
    isError: activeTestsError,
    isLoading: activeTestsLoading,
  } = useGetMyTests({
    query: {
      status: 'active',
    },
  });
  const [selectedTest, setSelectedTest] = React.useState<any>();
  // Extract query parameters
  const searchParams = new URLSearchParams(location.search);

  const handleStartTest = (test: any) => {
    setInTest(true);
    setSelectedTest(test);
    navigate(
      `/dashboard/student/test?testId=${test._id}&i=${0}&problem=${test.questions[0].question}`
    );
  };
  useEffect(() => {
    if (activeTests && activeTests.data.docs.length > 0) {
      setSelectedTest(activeTests?.data?.docs[0]);
      console.log(activeTests?.data?.docs[0]);
      setInTest(false);
    }
  }, [activeTests]);

  useEffect(() => {
    if (testCompleted) {
      setInTest(false);
    }
  }, [testCompleted]);
  if (activeTestsLoading) {
    return <div>Loading...</div>;
  }
  if (activeTestsError) {
    return <div>Error...</div>;
  }
  if (activeTests && activeTests.data.docs.length === 0) {
    return (
      <Page title="Active Tests" className={css.root}>
        <Stack>
          <Group gap="xl">
            <Button variant="subtle" onClick={() => navigate(paths.dashboard.student.root)}>
              <PiArrowLeft size="xl" strokeWidth={10} /> {'  '}
              <Title order={3} mx="sm">
                Student Page
              </Title>
            </Button>
          </Group>
          <Paper shadow="xs" p="lg" radius="lg">
            <Stack ml="md">
              <Title order={2}>Active Tests</Title>
              <Group mt="xl">
                <Text>No Active Tests</Text>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Page>
    );
  }
  if (activeTests && !inTest && !testCompleted) {
    return (
      <Page title="Active Tests" className={css.root}>
        <Stack>
          <Group gap="xl">
            <Button variant="subtle" onClick={() => navigate(-1)}>
              <PiArrowLeft size="xl" strokeWidth={10} /> {'  '}
              <Title order={3} mx="sm">
                Student Page
              </Title>
            </Button>
          </Group>
          <Paper shadow="xs" p="lg" radius="lg">
            <Stack ml="md">
              <Title order={2}>Active Tests</Title>
              <Stack mt="xl">
                {activeTests?.data?.docs.map(
                  (test: {
                    _id: string;
                    user: {
                      firstName: string;
                    };
                    systems: { name: string }[];
                    questionTypes: string[];
                    questionsCount: number;
                  }) => (
                    <Stack
                      key={test._id}
                      gap="sm"
                      style={{
                        border: '1px solid #e1e1e1',
                        borderRadius: '10px',
                        cursor: 'pointer',
                      }}
                      p="lg"
                      onClick={() => {
                        handleStartTest(test);
                      }}
                    >
                      <Group>
                        <Text fw="bold">1.</Text>{' '}
                        <Text fw={600} size="lg">
                          New Test by {test.user.firstName}
                        </Text>
                      </Group>
                      <Divider my="md" bg="red" w="100%" />
                      <Group>
                        <Text fw={600} size="lg">
                          Systems :{' '}
                        </Text>
                        <Text>
                          {test.systems.map((typee: { name: string }) => typee.name).join(', ')}{' '}
                        </Text>
                      </Group>

                      <Group>
                        <Text fw={600} size="lg">
                          No of Questions :{' '}
                        </Text>
                        <Text>{test.questionsCount}</Text>
                      </Group>

                      <Group>
                        <Text fw={600} size="lg">
                          Generation :{' '}
                        </Text>
                        <Text>{test.questionTypes.map((typee: String) => typee).join(', ')}</Text>
                      </Group>
                    </Stack>
                  )
                )}
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Page>
    );
  }
  if (inTest) {
    return (
      <Page title="Test Running" className={css.root}>
        <TestOutlineComponent
          questionsArray={selectedTest?.questions}
          testId={searchParams.get('testId')}
          questionIndex={searchParams.get('i')}
          problemId={searchParams.get('problem')} //this is basically questionId but keeping as problemId for now
          setTestCompleted={setTestCompleted}
        />
      </Page>
    );
  }

  if (testCompleted) {
    return (
      <Page title="Active Tests" className={css.root}>
        <Stack>
          <Group gap="xl">
            <Button variant="subtle" onClick={() => navigate(-1)}>
              <PiArrowLeft size="xl" strokeWidth={10} /> {'  '}
              <Title order={3} mx="sm">
                Student Page
              </Title>
            </Button>
          </Group>
          <Paper shadow="xs" p="lg" radius="lg">
            <Stack ml="md">
              <Title order={2}>Test Completed</Title>
              <Group mt="xl">
                <Text>Test Completed</Text>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Page>
    );
  }
};

export default index;
