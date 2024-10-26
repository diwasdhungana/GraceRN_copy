import { Page } from '@/components/page';
import { useGetQuestions } from '@/hooks/api/questions';
import { paths } from '@/routes';
import { Button, Divider, Group, Paper, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { PiArrowLeft } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import QuestionDisplay from './Specific/QuestionDisplay';

const ViewQuesitons = () => {
  const navigate = useNavigate();
  const {
    data: Questions,
    isError: questionsError,
    isLoading: questionsLoading,
  } = useGetQuestions();
  return (
    <Page title="Viiew Questions">
      <Stack>
        <Group gap="xl">
          <Button variant="subtle" onClick={() => navigate(-1)}>
            <PiArrowLeft size="xl" /> {'  '}
            <Text size="lg"></Text>
          </Button>
        </Group>
        <Title order={2}>View Questions</Title>
        <Paper radius="lg" shadow="md">
          <Stack px="md">
            {Questions &&
              Questions?.data?.docs?.map((eeutaQuestion, index) => {
                return (
                  <Paper key={index} px="xl" radius="sm" shadow="none" withBorder>
                    <Group>
                      <Text>{index}</Text>
                      <div
                        dangerouslySetInnerHTML={{ __html: eeutaQuestion.title }}
                        onClick={() =>
                          navigate(paths.dashboard.admin.viewQuestions.root + eeutaQuestion._id)
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    </Group>
                  </Paper>
                );
              })}
          </Stack>
        </Paper>
      </Stack>
    </Page>
  );
};

export default ViewQuesitons;
