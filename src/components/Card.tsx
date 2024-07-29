import { Box, Stack } from '@mui/material';
import ContactsForm from './Contacts.tsx';
import { ReactNode, useState } from 'react';
import ProjectsFeed from './ProjectsFeed.tsx';
import ContactsTab from './ContactsTab.tsx';
import ProjectsTab from './ProjectsTab.tsx';

const Card = () => {
  const [selectedTab, setSelectedTab] = useState<string>('contacts');

  return (
    <Stack>
      <Box>
        <ContactsTab tab={selectedTab} setTab={setSelectedTab} />
        <ProjectsTab tab={selectedTab} setTab={setSelectedTab} />
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
