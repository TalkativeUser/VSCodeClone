// import { useDispatch, useSelector } from "react-redux";
// import { setClickedFileAction, setOpenedFilesAction, setTabIdToRemoveAction } from "../app/features/fileTreeSlice";
// import { RootState } from "../app/store";
// import { IFile } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { FileInterface } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import { setClickedFileAction, setOpendFile, setTapIDToRemoveAction } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";


interface IProps {
  file: FileInterface;
}

const OpenedFilesBarTab = ({ file }: IProps) => {

const dispatch=useDispatch()
const { clickedFile , openedFiles } = useSelector((state: RootState) => state.tree);

const onCloseIconHandler =(tapClosedID:string)=> {
    const filtered = openedFiles.filter(file => file.id !== tapClosedID);
    const lastTab = filtered[filtered.length - 1];

    if (!lastTab) {
      dispatch(setOpendFile([]));
      dispatch(setClickedFileAction({activeFileID:null , fileContent: "", filename: "" }));
      return;
    }
    const { id, name, content } = lastTab;
    dispatch(setOpendFile(filtered));
    dispatch(setClickedFileAction({ activeFileID: id, fileContent: content, filename: name }));
}



const fileToShowContentMethod= {

   filename:file.name,
        fileContent:file.content,
        activeFileID:file.id
}


function onClick_fileTap_Handler () {

   dispatch(setClickedFileAction(fileToShowContentMethod)) 

}


  return (
    <div
    onClick={onClick_fileTap_Handler }
  onContextMenu={ (e)=>{
      e.preventDefault()
      dispatch(setTapIDToRemoveAction(file.id))

  }
  }

      className={`max-w-screen-md flex items-center p-2 border-t-2 ${ 
       file.id===clickedFile.activeFileID ? "border-t-4 border-blue-700  ":"border-t-3 border-transparent"

      }`}


    >
      <RenderFileIcon fileName={file.name} />
      <span className=" text-white cursor-pointer duration-300 flex justify-center items-center w-fit mx-2 p-1 rounded-md">
        {file.name}
      </span>
      <span onClick={(e)=>{ e.stopPropagation() ; onCloseIconHandler(file.id) }}
        className="cursor-pointer hover:bg-[#64646473] duration-300 flex justify-center items-center w-fit mr-2 p-1 rounded-md">
        <CloseIcon />
      </span>


    </div>
  );
};

export default OpenedFilesBarTab;













   // onClick={e => {
        //   e.stopPropagation();
        //   onRemove(file.id);
        // }}




    //   file.id === activeTabId ? "border-[#cf6ccf]" :

    //   onClick={onClick}
    //   onContextMenu={e => {
    //     e.preventDefault();
    //     dispatch(setTabIdToRemoveAction(file.id));
    //   }} 
    
    //  dispatch(setActiveID(file.id)) 

    //   const dispatch = useDispatch();

//   const {
//     openedFiles,
//     clickedFile: { activeTabId },
//   } = useSelector((state: RootState) => state.tree);

  // ** Handlers
//   const onClick = () => {
//     const { id, name, content } = file;
//     dispatch(setClickedFileAction({ filename: name, fileContent: content, activeTabId: id }));
//   };
//   const onRemove = (selectedId: string) => {
//     const filtered = openedFiles.filter(file => file.id !== selectedId);
//     const lastTab = filtered[filtered.length - 1];

//     if (!lastTab) {
//       dispatch(setOpenedFilesAction([]));
//       dispatch(setClickedFileAction({ activeTabId: null, fileContent: "", filename: "" }));
//       return;
//     }
//     const { id, name, content } = lastTab;
//     dispatch(setOpenedFilesAction(filtered));
//     dispatch(setClickedFileAction({ activeTabId: id, fileContent: content, filename: name }));
//   };
