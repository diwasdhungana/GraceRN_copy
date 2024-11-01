import { Page } from '@/components/page';
import { useGetQuestions } from '@/hooks/api/questions';
import { paths } from '@/routes';
import {
  Badge,
  Button,
  Divider,
  Group,
  Pagination,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import React, { useState } from 'react';
import { PiArrowLeft, PiTrashBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import QuestionDisplay from './Specific/QuestionDisplay';
import CSS from '@/pages/dashboard/everything.module.css';
import { modals } from '@mantine/modals';
import { useDeleteManyQuestions } from '@/hooks';
import css from '@/pages/dashboard/everything.module.css';
const ViewQuesitons = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);
  const [page, setPage] = useState(1); // State for current page
  const [filters, setFilters] = useState({
    keyword: ['deleted'],
  }); // State for filters
  const { mutate: deleteQuestionMutate, isPending: questionDeletePending } =
    useDeleteManyQuestions();
  const {
    data: Questions,
    isError: questionsError,
    isLoading: questionsLoading,
  } = useGetQuestions({
    query: {
      page: page.toString(), // Convert page number to string
      limit: limit.toString(), // Convert limit to string
      // filters: 'title',
      // keyword: 'fa',
    },
  });
  const totalPages = Questions ? Math.ceil(Questions.data.totalDocs / limit) : 0;
  const deleteQuestion = (id, name) => {
    modals.openConfirmModal({
      title: 'Delete selected Question?',
      centered: true,
      children: <Text size="sm">Are you sure you want to delete the selected question?</Text>,
      labels: { confirm: 'Delete Question', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        deleteQuestionMutate({ variables: [id] });
      },
    });
  };
  return (
    <Page title="Viiew Questions">
      <Stack>
        <Group gap="xl">
          <Button variant="subtle" onClick={() => navigate(-1)}>
            <PiArrowLeft size="xl" strokeWidth={10} /> {'  '}
            <Title order={3} mx="sm">
              Admin Page
            </Title>
          </Button>
        </Group>
        <Title order={2}>View Questions</Title>
        <Paper radius="lg">
          <Stack px="md">
            {Questions &&
              Questions?.data?.docs?.map((eeutaQuestion, index) => {
                return (
                  <Paper key={index} px="xl" radius="sm" shadow="none" withBorder>
                    <Group justify="space-between">
                      <Stack>
                        <Group>
                          <Text>{Questions.data.totalDocs - index - (page - 1) * limit}.</Text>

                          <div
                            className={css.htmlContentDisplay}
                            dangerouslySetInnerHTML={{ __html: eeutaQuestion.title }}
                            onClick={() =>
                              navigate(paths.dashboard.admin.viewQuestions.root + eeutaQuestion._id)
                            }
                            style={{ cursor: 'pointer' }}
                          />
                        </Group>
                        <Group mb="xs" justify="space-between" w="100%">
                          <Group>
                            <Badge color="purple" variant="light">
                              {eeutaQuestion.number?.toString() || 'Question number'}
                            </Badge>
                            <Badge color="blue" variant="light">
                              {eeutaQuestion.type}
                            </Badge>
                            <Badge color="green" variant="light">
                              {eeutaQuestion.kind}
                            </Badge>
                          </Group>
                          <Group>
                            <Badge color="red" variant="light">
                              {eeutaQuestion.subject.name || 'subject'}
                            </Badge>
                            <Badge color="orange" variant="light">
                              {eeutaQuestion.system.name || 'system'}
                            </Badge>
                            <Badge color="black" variant="light">
                              points : {eeutaQuestion.points || 'system'}
                            </Badge>
                          </Group>
                        </Group>
                      </Stack>
                      <Button
                        variant="subtle"
                        bg="none"
                        size="xs"
                        radius="10"
                        onClick={() => {
                          deleteQuestion(eeutaQuestion._id, eeutaQuestion.title);
                        }}
                      >
                        <PiTrashBold size="30px" color="red" style={{ margin: '5px' }} />
                      </Button>
                    </Group>
                  </Paper>
                );
              })}
          </Stack>
          <Group justify="center">
            <Pagination
              className={CSS.paginationControls}
              value={page}
              onChange={setPage}
              total={totalPages}
              size="sm"
              style={(theme) => ({
                item: {
                  '&[data-active]': {
                    backgroundColor: theme.colors.blue[6], // Custom background for active page
                    color: theme.white, // Custom text color for active page
                  },
                },
              })}
              radius="xs"
              mb="md"
            />
          </Group>
        </Paper>
      </Stack>
    </Page>
  );
};

export default ViewQuesitons;
