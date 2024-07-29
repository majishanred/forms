export type ProjectInfo = {
  name: string;
  skills: string[];
  role: string;
  beginDate: string;
  endDate?: string;
};

export type Project = {
  id: number;
  projectNumber: number;
  projectInfo: ProjectInfo;
  changing: boolean;
  error: unknown;
};
