import { Page } from '@/components/page';
import { useGetQuestions } from '@/hooks/api/questions';
import { Paper, Stack, Title } from '@mantine/core';
import React from 'react';

const ViewQuesitons = () => {
  const {
    data: Questions,
    isError: questionsError,
    isLoading: questionsLoading,
  } = useGetQuestions();
  return (
    <Page title="Viiew Questions">
      <Stack>
        <Title order={2}>View Questions</Title>
        <Paper radius="lg" shadow="md">
          {Questions &&
            Questions?.data?.docs?.map((eeutaQuestion) => {
              eeutaQuestion.title;
            })}
        </Paper>
      </Stack>
    </Page>
  );
};

export default ViewQuesitons;
