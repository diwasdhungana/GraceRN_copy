import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionDisplay from './QuestionDisplay';
import { useGetSpecificQuestion } from '@/hooks/api/questions';
import { Button, Group, Stack, Title } from '@mantine/core';
import { PiArrowLeft } from 'react-icons/pi';

const SpecificQuestion = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const {
    data: question,
    isError: errorQuestion,
    isLoading: loadingQuestion,
  } = useGetSpecificQuestion({ route: { questionId } });
  return (
    <Stack>
      <Group gap="xl">
        <Button variant="subtle" onClick={() => navigate(-1)}>
          <PiArrowLeft size="xl" strokeWidth={10} /> {'  '}
          <Title order={3} mx="sm">
            Questions
          </Title>
        </Button>
      </Group>
      {loadingQuestion && <div>loading...</div>}
      {errorQuestion && <div>error...</div>}
      {question && <QuestionDisplay props={{ question, mode: 'admin' }} />}
    </Stack>
  );
};

export default SpecificQuestion;
