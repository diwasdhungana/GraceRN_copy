import { Page } from '@/components/page';

import classes from '@/pages/dashboard/everything.module.css';
import { Button, Group, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { paths } from '@/routes';

export default function HomePage() {
  const navigate = useNavigate();
  const handleGotoAdminPanel = () => {
    navigate(paths.dashboard.admin.root);
  };
  return (
    <Page title="Home" className={classes.root}>
      <Title className={classes.title}>Welcome to Grace RN</Title>
      <Group>
        <Button size="xl" onClick={handleGotoAdminPanel}>
          Admin Panel
        </Button>
      </Group>
    </Page>
  );
}
