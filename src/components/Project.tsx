import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import StyledForm from '../styled/StyledForm.tsx';
import { Delete } from '@mui/icons-material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectFormFields, projectSchema } from '../schemas/ProjectSchema.ts';
import { Project, ProjectInfo } from '../types/Project.ts';
import { useInfoStore } from '../stores/InfoStore.tsx';
import { StyledFormTab } from '../styled/StyledFormTab.tsx';
import { useEffect, useRef } from 'react';

type ProjectFormProps = {
  project: Project;
  projectNum: number;
};

const ProjectForm = ({ project }: ProjectFormProps) => {
  const changing = project.changing;
  const changeProject = useInfoStore((state) => state.changeProject);
  const deleteProject = useInfoStore((state) => state.deleteProject);

  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log(ref.current.);
  }, []);

  const { control, handleSubmit } = useForm<ProjectInfo>({
    defaultValues: project.projectInfo,
    resolver: zodResolver(projectSchema),
  });

  const onSubmit: SubmitHandler<ProjectFormFields> = (data) => {
    const newProj = { ...project, projectInfo: data };
    changeProject(newProj);
  };

  return (
    <StyledForm noValidate onSubmit={handleSubmit(onSubmit)} ref={ref}>
      <StyledFormTab>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography padding="4px">Проект №{project.projectNumber}</Typography>

          {changing && <Delete onClick={() => deleteProject(project)} />}
        </Box>
        <Stack gap="24px" marginTop="24px">
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl>
                <TextField
                  label="Название"
                  placeholder="Название проекта"
                  value={value}
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  disabled={!changing}
                />
                <FormHelperText error>{error?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="skills"
            control={control}
            render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
              <FormControl>
                <InputLabel id="demo-simple-select-label" required>
                  Навыки
                </InputLabel>
                <Select
                  value={value}
                  onChange={(event) => {
                    onChange(addSkills(value, event.target.value));
                  }}
                  ref={ref}
                  label="Навыки"
                  renderValue={(values) => values.map((selected) => <Chip label={selected} />)}
                  required
                  disabled={!changing}
                >
                  {skills.map((skill, index) => (
                    <MenuItem key={index} value={skill}>
                      <Typography>{skill}</Typography>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{error?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl fullWidth required>
                <InputLabel>Роль на проекте</InputLabel>
                <Select label="Роль на проекте" value={value} onChange={onChange} required disabled={!changing}>
                  {roles.map((role, index) => (
                    <MenuItem key={index} value={role}>
                      <Typography>{role}</Typography>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{error?.message}</FormHelperText>
              </FormControl>
            )}
            name="role"
          />
          <Box display="flex" gap="16px">
            <Controller
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormControl>
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Начало работы"
                    placeholder="ДД.ММ.ГГГГ"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    disabled={!changing}
                  />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
              name="beginDate"
            />
            <Controller
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormControl>
                  <TextField
                    value={value}
                    onChange={onChange}
                    label="Окончание работы"
                    placeholder="ДД.ММ.ГГГГ"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={!changing}
                  />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
              name="endDate"
            />
          </Box>
        </Stack>
        {changing ? (
          <Button type="submit" variant="contained" sx={{ marginLeft: 'auto' }}>
            Добавить
          </Button>
        ) : (
          <Button></Button>
        )}
      </StyledFormTab>
    </StyledForm>
  );
};

const skills = ['vue', 'react', 'nodejs', 'next', 'angular', 'svelte'];
const roles = ['Разработчик', 'Тестер', 'Девопс', 'ПМ', 'Шлёпа'];

const addSkills = (prevState: string[], add: string | string[]) => {
  if (typeof add === 'string') {
    if (prevState.includes(add)) return prevState.filter((item) => item !== add);
    return [...prevState, add];
  }

  return [];
};

export default ProjectForm;
