export interface FileInterface {
    id: string;
    name: string ;
    isFolder: boolean;
    children?:null|FileInterface[];
    content?: string;
  }
  