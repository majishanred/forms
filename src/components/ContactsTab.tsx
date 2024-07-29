import { useInfoStore } from '../stores/InfoStore.tsx';
import { Dispatch, SetStateAction } from 'react';
import StyledTab from '../styled/StyledTab.tsx';
import { Typography } from '@mui/material';

const ContactsTab = ({ tab, setTab }: { tab: string; setTab: Dispatch<SetStateAction<string>> }) => {
  const error = useInfoStore((state) => state.contactsInfo.error);

  return (
    <StyledTab onClick={() => setTab('contacts')} choosen={tab === 'contacts'} error={error}>
      <Typography textTransform="uppercase">контактная информация</Typography>
    </StyledTab>
  );
};

export default ContactsTab;
