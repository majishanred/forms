import { Dispatch, SetStateAction } from 'react';
import { useInfoStore } from '../stores/InfoStore.tsx';
import { Typography } from '@mui/material';
import StyledTab from '../styled/StyledTab.tsx';

export const ProjectsTab = ({ tab, setTab }: { tab: string; setTab: Dispatch<SetStateAction<string>> }) => {
  const errors = useInfoStore((state) => state.projectsInfo.errors);

  return (
    <StyledTab onClick={() => setTab('projects')} choosen={tab === 'projects'} error={!!errors.length}>
      <Typography textTransform="uppercase">проекты</Typography>
    </StyledTab>
  );
};

export default ProjectsTab;
