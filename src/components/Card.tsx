import { Box, Button, Stack, Typography } from '@mui/material';
import ContactsForm from './Contacts.tsx';
import { ReactNode, useState } from 'react';
import ProjectsFeed from './ProjectsFeed.tsx';

const Card = () => {
  const [selectedTab, setSelectedTab] = useState<string>('contacts');
  return (
    <Stack>
      <Box>
        {Object.entries(tabs).map((item, index) => {
          const [key, tab] = item;

          return (
            <Button key={index} onClick={() => setSelectedTab(key)}>
              <Typography textTransform="uppercase">{tab.alias}</Typography>
            </Button>
          );
        })}
      </Box>
      {tabs[selectedTab].component}
    </Stack>
  );
};

const tabs: Tabs = {
  contacts: {
    component: <ContactsForm />,
    alias: 'контактная информация',
  },
  projects: {
    component: <ProjectsFeed />,
    alias: 'проекты',
  },
};

type Tabs = {
  [key: string]: Tab;
};

type Tab = {
  component: ReactNode;
  alias: string;
};

export default Card;
