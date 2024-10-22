import { Page } from '@/components/page';
import React from 'react';
import css from '@/pages/dashboard/everything.module.css';
import { Button, Group, Title } from '@mantine/core';
import { paths } from '@/routes';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();
  const handleGotoQuestions = () => {
    navigate(paths.dashboard.admin.addQuestions.root);
  };
  return (
    <Page title="Home" className={css.root}>
      <Title className={css.title}>This is admin page</Title>
      <Group>
        <Button size="xl" onClick={handleGotoQuestions}>
          Add Questions
        </Button>
      </Group>
    </Page>
  );
};

export default index;