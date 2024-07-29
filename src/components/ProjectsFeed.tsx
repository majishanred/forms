import ProjectForm from './Project.tsx';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { useInfoStore } from '../stores/InfoStore.tsx';
import { Project } from '../types/Project.ts';
import { StyledFromSection } from '../styled/StyledForm.tsx';

const ProjectsFeed = () => {
  const projects = useInfoStore((state) => state.projectsInfo.projects);
  const addProject = useInfoStore((state) => state.addProject);
  const saveAll = useInfoStore((state) => state.saveAll);

  return (
    <>
      <StyledFromSection>
        <StyledGridContainer>
          {projects.map((project: Project) => (
            <ProjectForm key={project.id} project={project} />
          ))}
          <StyledAddButton onClick={() => addProject()}>+</StyledAddButton>
        </StyledGridContainer>
      </StyledFromSection>
      <StyledFromSection>
        <Stack>
          <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }} onClick={() => saveAll()}>
            <Typography textTransform="uppercase">сохранить</Typography>
          </Button>
        </Stack>
      </StyledFromSection>
    </>
  );
};

const StyledGridContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 520px);
  grid-auto-rows: max-content;

  gap: 16px;
`;

const StyledAddButton = styled(Button)`
  font-size: 128px;
  font-weight: 200;
`;

export default ProjectsFeed;
