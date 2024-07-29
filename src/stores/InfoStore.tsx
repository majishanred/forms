import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ContactsType } from '../types/Contacts.ts';
import { Project } from '../types/Project.ts';

const contactsDefaultValue: ContactsType = {
  contactsInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    luboiDvij: true,
  },
  error: null,
};

type InfoStore = {
  contactsInfo: ContactsType;
  projects: Project[];
  projectsLength: number;
};

type Actions = {
  changeContactsInfo: (contacts: ContactsType) => void;
  addProject: () => void;
  changeProject: (project: Project) => void;
  deleteProject: (project: Project) => void;
};

const defaultProject: Project = {
  id: 0,
  projectNumber: 0,
  projectInfo: {
    name: '',
    skills: [],
    role: '',
    beginDate: '',
    endDate: undefined,
  },
  changing: true,
  error: null,
};

export const useInfoStore = create<InfoStore & Actions>()(
  immer((set) => ({
    contactsInfo: contactsDefaultValue,
    projects: [],
    projectsLength: 0,
    changeContactsInfo: (contacts: ContactsType) => {
      set((state) => {
        state.contactsInfo = contacts;
      });
    },
    addProject: () => {
      set((state) => {
        state.projectsLength = state.projectsLength + 1;
        state.projects.push({ ...defaultProject, projectNumber: state.projectsLength, id: Date.now() });
      });
    },
    changeProject: (project: Project) => {
      set((state) => {
        const projIndex = state.projects.findIndex((element) => element.id === project.id);
        state.projects[projIndex] = project;
      });
    },
    deleteProject: (project: Project) => {
      set((state) => {
        state.projects = state.projects.filter((item) => item.id !== project.id);
      });
    },
  })),
);
