import React from 'react';
import { useParams } from 'react-router-dom';
import QuestionDisplay from './QuestionDisplay';
import { useGetSpecificQuestion } from '@/hooks/api/questions';

const SpecificQuestion = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const {
    data: question,
    isError: errorQuestion,
    isLoading: loadingQuestion,
  } = useGetSpecificQuestion({ route: { questionId } });
  return (
    <div>
      {loadingQuestion && <div>loading...</div>}
      {errorQuestion && <div>error...</div>}
      {question && <QuestionDisplay props={{ question, mode: 'admin' }} />}
    </div>
  );
};

export default SpecificQuestion;
