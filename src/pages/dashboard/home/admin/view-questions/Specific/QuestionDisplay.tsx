import { Page } from '@/components/page';
import { Group, Paper, ScrollArea, Text } from '@mantine/core';
import React, { useEffect } from 'react';
import { AssistanceTabsView } from './tabsView';
import QuestionViewWithModes from './question-view-category';
import css from '@/pages/dashboard/everything.module.css';

const QuestionDisplay = ({ props }: { props: any }) => {
  const { question, mode } = props;
  console.log(question);
  return (
    <>
      <Page title="Question" h="80vh">
        <Group gap="xl" justify="space-between">
          <Text fw="600">Type: {question.data.kind}</Text>
          <Text mx="lg" fw="600">
            Points : {question.data.points}
          </Text>
        </Group>
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
              <QuestionViewWithModes mode={mode} data={question.data} />
            </ScrollArea>
          </Paper>
        </Group>
      </Page>
    </>
  );
};

export default QuestionDisplay;
