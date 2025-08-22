export interface Institution {
  id: number;
  name:string;
}

export interface InstitutionCategory {
  title: string;
  institutions: Institution[];
}

export interface WorkHistoryEntry {
  id: string;
  workName: string;
  dateSaved: string;
  submitted: {
    id: number;
    name: string;
  }[];
}
