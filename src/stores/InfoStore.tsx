import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ContactsType } from '../types/Contacts.ts';
import { Project } from '../types/Project.ts';
import { BaseSyntheticEvent } from 'react';

const contactsDefaultValue: ContactsType = {
  contactsInfo: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    luboiDvij: true,
  },
  changing: true,
  error: null,
};

type InfoStore = {
  contactsInfo: ContactsType;
  projectsInfo: {
    projects: Project[];
    projectsLength: number;
    submitHandlers: ((e?: BaseSyntheticEvent) => Promise<void>)[];
    errors: number[];
  };
};

type Actions = {
  changeContactsInfo: (contacts: ContactsType) => void;
  addProject: () => void;
  changeProject: (project: Project) => void;
  deleteProject: (project: Project) => void;
  saveAll: () => void;
  addSubmitHandler: (handler: (e?: BaseSyntheticEvent) => Promise<void>) => void;
  addError: (error: number) => void;
  removeError: (error: number) => void;
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
    projectsInfo: {
      projects: [],
      projectsLength: 0,
      errors: [],
      submitHandlers: [],
    },
    changeContactsInfo: (contacts: ContactsType) => {
      set((state) => {
        state.contactsInfo = contacts;
      });
    },
    addProject: () => {
      set((state) => {
        state.projectsInfo.projectsLength += 1;
        state.projectsInfo.projects.push({
          ...defaultProject,
          projectNumber: state.projectsInfo.projectsLength,
          id: Date.now(),
        });
      });
    },
    changeProject: (project: Project) => {
      set((state) => {
        const projIndex = state.projectsInfo.projects.findIndex((item) => item.id === project.id);
        state.projectsInfo.projects[projIndex] = project;
      });
    },
    deleteProject: (project: Project) => {
      set((state) => {
        state.projectsInfo.projects = state.projectsInfo.projects.filter((item) => item.id !== project.id);
      });
    },
    saveAll: () => {
      set((state) =>
        state.projectsInfo.submitHandlers.forEach((submitHandler) => {
          submitHandler();
        }),
      );
    },
    addSubmitHandler: (handler) => {
      set((state) => {
        state.projectsInfo.submitHandlers.push(handler);
      });
    },
    addError: (error) => {
      set((state) => {
        if (state.projectsInfo.errors.includes(error)) return;
        state.projectsInfo.errors.push(error);
      });
    },
    removeError: (id: number) => {
      set((state) => {
        state.projectsInfo.errors = state.projectsInfo.errors.filter((error) => error !== id);
      });
    },
  })),
);
