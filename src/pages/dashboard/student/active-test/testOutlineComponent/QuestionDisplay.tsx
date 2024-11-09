import { Page } from '@/components/page';
import { Button, Group, Paper, ScrollArea, Text } from '@mantine/core';
import React, { useEffect } from 'react';
import { AssistanceTabsView } from './tabsView';
import QuestionViewWithModes from './question-solver-category';
import css from '@/pages/dashboard/everything.module.css';
import { useNavigate } from 'react-router-dom';

const QuestionDisplay = ({ props }: { props: any }) => {
  const navigate = useNavigate();
  const { question, mode, setTestCompleted, questionIndex, testId, questionsArray } = props;
  const thisIndex: number = Number(questionIndex);
  const nextIndex = thisIndex + 1;
  const prevIndex = thisIndex - 1;
  const nextQuestion = questionsArray[nextIndex]?.question;
  const prevQuestion = questionsArray[prevIndex]?.question;

  return (
    <>
      <Page title="Question" h="83vh">
        <Group h="100%" gap="3px" grow>
          {question.data.assistanceColumn && (
            <Paper withBorder w="0%" p="sm" h="100%">
              <ScrollArea h="100%">
                <div dangerouslySetInnerHTML={{ __html: question.data.assistanceColumn.title }} />
                {question.data.assistanceColumn.tabs && (
                  <AssistanceTabsView data={question.data.assistanceColumn.tabs} />
                )}
                {
                  <Text>
                    {question.data.assistanceColumn.assistanceData && (
                      <div
                        className={css.htmlContentDisplay}
                        dangerouslySetInnerHTML={{
                          __html: question.data.assistanceColumn.assistanceData,
                        }}
                      />
                    )}
                  </Text>
                }
              </ScrollArea>
            </Paper>
          )}
          <Paper withBorder h="100%" p="sm">
            <ScrollArea h="100%">
              <QuestionViewWithModes
                mode={mode}
                data={{ ...question.data, setTestCompleted, thisIndex, testId, questionsArray }}
              />
            </ScrollArea>
          </Paper>
        </Group>
        <Group gap="xl" mt="sm" justify="space-between">
          <Group>
            <Button>End Test</Button>
            <Button>Suspend</Button>
          </Group>
          <Group>
            <Button
              disabled={thisIndex == 0}
              onClick={() => {
                navigate(
                  `/dashboard/student/test?testId=${testId}&i=${prevIndex}&problem=${prevQuestion}`
                );
              }}
            >
              Previous
            </Button>
            <Button
              disabled={thisIndex === questionsArray.length - 1}
              onClick={() => {
                navigate(
                  `/dashboard/student/test?testId=${testId}&i=${nextIndex}&problem=${nextQuestion}`
                );
              }}
            >
              Next
            </Button>
          </Group>
        </Group>
      </Page>
    </>
  );
};

export default QuestionDisplay;
