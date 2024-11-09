import { Page } from '@/components/page';
import React from 'react';
import { Button, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { paths } from '@/routes';
import { useNavigate } from 'react-router-dom';
import classes from '@/pages/dashboard/everything.module.css';

const index = () => {
  const navigate = useNavigate();

  return (
    <Page title="Home" className={classes.root}>
      <Group justify="center" h="80%">
        <Stack justify="center" align="center">
          <Title className={classes.title}> Student Page </Title>
          <Text>More Features will be available very soon.</Text>
          <Divider my="md" bg="red" w="100%" />
          <Group>
            <Button
              size="xl"
              onClick={() => {
                navigate(paths.dashboard.student.createTest.root);
              }}
            >
              New Test
            </Button>
            <Button
              size="xl"
              onClick={() => {
                navigate(paths.dashboard.student.viewResults.root);
              }}
            >
              Results History
            </Button>
            {/* <Button
              size="xl"
              onClick={() => {
                navigate(paths.dashboard.admin.viewSubjectSystem.root);
              }}
            >
              Subjects and Systems
            </Button> */}
          </Group>
        </Stack>
      </Group>
    </Page>
  );
};

export default index;
