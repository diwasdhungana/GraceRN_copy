import { Button, Group, Paper } from '@mantine/core';
import React from 'react';
import { requestDataCreator } from './requestDataCreator';
import { usePostQuestion } from '@/hooks/api/questions';

export const SubmitQuestion = ({ dataTunnel, response, setResponse }) => {
  const { mutate: postQuestion, isPending } = usePostQuestion();
  const handleSubmit = () => {
    // console.log('submitting', dataTunnel());
    const variables = requestDataCreator(dataTunnel, setResponse);
    console.log('variables', variables);
    postQuestion(
      { variables },
      {
        onSuccess: (data) => {
          console.log('Success');
          setResponse({ status: 'success' });
        },
        onError: (error) => {
          console.log('error', error);
        },
      }
    );
  };
  return (
    <Group mt="md">
      <Button
        bg="green"
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </Button>
    </Group>
  );
};
