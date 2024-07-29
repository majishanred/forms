import ProjectForm from './Project.tsx';
import { Box, Button, Stack, styled } from '@mui/material';
import { useInfoStore } from '../stores/InfoStore.tsx';
import { Project } from '../types/Project.ts';
import { StyledFromSection } from '../styled/StyledForm.tsx';

const ProjectsFeed = () => {
  const projects = useInfoStore((state) => state.projects);
  const addProject = useInfoStore((state) => state.addProject);

  return (
    <>
      <StyledFromSection>
        <StyledGridContainer>
          {projects.map((project: Project) => (
            <ProjectForm project={project} projectNum={projects.length} />
          ))}
          <Button onClick={() => addProject()}>+</Button>
        </StyledGridContainer>
      </StyledFromSection>
      <StyledFromSection>
        <Stack>
          <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>
            Сохранить
          </Button>
        </Stack>
      </StyledFromSection>
    </>
  );
};

const StyledGridContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 400px;

  gap: 16px;
`;

export default ProjectsFeed;
