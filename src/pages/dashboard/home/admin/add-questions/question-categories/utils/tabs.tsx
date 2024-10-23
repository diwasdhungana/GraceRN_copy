import React from 'react';
import { Stack, Tabs } from '@mantine/core';

//let's create a type for the data that we will pass to the AssistanceTabs component
type AssistanceTabData = {
  title: string;
  content: React.ReactNode;
};

export const AssistanceTabs = ({ data }: { data: AssistanceTabData[] }) => {
  return (
    <Tabs defaultValue="gallery">
      <Tabs.List>
        {data.map((item, index) => (
          <Tabs.Tab value={item.title}>{item.title}</Tabs.Tab>
        ))}
      </Tabs.List>

      {data.map((item, index) => (
        <Tabs.Panel value={item.title}>
          <Stack>{item.content}</Stack>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
