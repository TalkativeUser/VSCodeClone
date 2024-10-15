import { FileInterface } from "../interfaces";

export const doseFileObjectExist=(openedFiles: FileInterface[] ,clickedFileID:string)=>{


return openedFiles.some( file=> file.id===clickedFileID )


} 