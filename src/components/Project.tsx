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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '../schemas/ProjectSchema.ts';
import { Project, ProjectInfo } from '../types/Project.ts';
import { StyledFormTab } from '../styled/StyledFormTab.tsx';
import { useCallback, useEffect } from 'react';
import { useInfoStore } from '../stores/InfoStore.tsx';
import { formatToDDMMYYYY, formatToZodDate } from '../utils/utils.ts';

type ProjectFormProps = {
  project: Project;
};

const ProjectForm = ({ project }: ProjectFormProps) => {
  const changeProject = useInfoStore((state) => state.changeProject);
  const deleteProject = useInfoStore((state) => state.deleteProject);
  const addSubmitHandler = useInfoStore((state) => state.addSubmitHandler);
  const addError = useInfoStore((state) => state.addError);
  const removeError = useInfoStore((state) => state.removeError);

  const { control, handleSubmit } = useForm<ProjectInfo>({
    defaultValues: project.projectInfo,
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = useCallback(
    (data: ProjectInfo) => {
      changeProject({ ...project, projectInfo: data, changing: false, error: false });
      removeError(project.id);
    },
    [changeProject, project],
  );

  const onInvalid = useCallback(() => {
    changeProject({ ...project, changing: true, error: true });
    addError(project.id);
  }, [project, changeProject]);

  const handler = handleSubmit(onSubmit, onInvalid);

  useEffect(() => {
    addSubmitHandler(handler);
  }, [onInvalid, onSubmit]);

  return (
    <StyledForm noValidate onSubmit={handler}>
      <StyledFormTab error={project.error}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography padding="4px">Проект №{project.projectNumber}</Typography>

          {project.changing && <Delete onClick={() => deleteProject(project)} />}
        </Box>
        <Stack gap="16px">
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
                  required
                  disabled={!project.changing}
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
                  renderValue={(values) => (
                    <Box display="flex" gap="8px">
                      {values.map((value, index) => (
                        <Chip key={index} label={value} />
                      ))}
                    </Box>
                  )}
                  required
                  disabled={!project.changing}
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
                <Select label="Роль на проекте" value={value} onChange={onChange} required disabled={!project.changing}>
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
                    value={formatToDDMMYYYY(value)}
                    onChange={(e) => {
                      onChange(formatToZodDate(e.target.value));
                    }}
                    label="Начало работы"
                    placeholder="ДД.ММ.ГГГГ"
                    required
                    disabled={!project.changing}
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
                    value={formatToDDMMYYYY(value!)}
                    onChange={(e) => {
                      onChange(formatToZodDate(e.target.value));
                    }}
                    label="Окончание работы"
                    placeholder="ДД.ММ.ГГГГ"
                    disabled={!project.changing}
                  />
                  <FormHelperText error>{error?.message}</FormHelperText>
                </FormControl>
              )}
              name="endDate"
            />
          </Box>
        </Stack>
        {project.changing && (
          <Button type="submit" variant="contained" sx={{ marginLeft: 'auto' }}>
            Добавить
          </Button>
        )}
        {!project.changing && (
          <Button
            variant="contained"
            sx={{ marginLeft: 'auto' }}
            onClick={() => {
              changeProject({ ...project, changing: true, error: false });
            }}
          >
            Редактировать
          </Button>
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
