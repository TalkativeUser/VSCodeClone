







//   الكود الصحيح والتمام 

import { useEffect, useRef, useState } from "react";
import { FileInterface } from "../interfaces";
import { v4 as uuidv4 } from 'uuid';
import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { setOpendFile, setClickedFileAction, setFolderActiveID, setIsClicked_On_CreateFile, setNewFile, setIsClicked_On_CreateFolder } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { doseFileObjectExist } from "../utils";


interface IProps {
  file: FileInterface;
}

const RecursiveComp = ({ file }: IProps) => {
  const inpCreatorFileRef = useRef<HTMLInputElement>(null);
  const inpCreatorFolderRef = useRef<HTMLInputElement>(null);
  const [inputValueFile, setInputValueFile] = useState<string>(""); 
  const [inputValueFolder, setInputValueFolder] = useState<string>(""); 
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const fileToShowContentMethod = {
    filename: file.name,
    fileContent: file.content,
    activeFileID: file.id,
  };

  const onFileClicked = ( ) => {
    dispatch(setClickedFileAction(fileToShowContentMethod));

    const existFile = doseFileObjectExist(openedFiles, file.id);
    if (existFile) return;

    dispatch(setOpendFile([...openedFiles, file]));
  };

  const { openedFiles, folderActiveID, isClicked_On_CreateFile, allFiles ,isClicked_On_CreateFolder } = useSelector((store: RootState) => store.tree);

  const handleFolderClicked = () => {
    toggle();
    dispatch(setFolderActiveID(file.id));
  };

  // استخدام الـ state لتكوين محتوى الملف
  const fileContent = inputValueFile.split('.')[1] ==="jsx" || inputValueFile.split('.')[1] ==="tsx" ?
  
  `
      interface IProps {
          title: string,
          description: string,
      }

      const ${inputValueFile.split('.')[0] } = ({ title, description }: IProps) => {
          return (
              <div>
                  <h3> {title} </h3>
                  <p> {description} </p>
              </div>
          );
      }

      export default ${inputValueFile.split('.')[0]};
  `:""

  const closeInpCreatorFile = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

 
    
    
    if (inpCreatorFileRef.current && target.id !== 'inputCreateFile' && target.id !== 'iconCreateFile') {
      dispatch(setIsClicked_On_CreateFile(false)); 

      if (inputValueFile) {
  

        callCreateNewFile();

    }
      
    

    }



    if (inpCreatorFolderRef.current && target.id !== 'inputCreateFolder' && target.id !== 'iconCreateFolder') {
      dispatch(setIsClicked_On_CreateFolder(false)); 
      if(inputValueFolder) {


        console.log('folder catched  => ', inputValueFolder);

        
        callCreateNewFolder();
  
  }
    
    }

      


  
  }
       
      


     
      
    


  const handleKeyPress_toHideFileInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setIsClicked_On_CreateFile(false));

      if (inputValueFile) {
       
        callCreateNewFile();
      }
    }
  };
  const handleKeyPress_toHideFolderInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setIsClicked_On_CreateFolder(false));

      if (inputValueFolder) {
       
        callCreateNewFolder();
      }
    }
  };

  
  let isFileFounded = false;

  const createFile = (fileTree: FileInterface): FileInterface => {

    console.log('hello world from  create file ');
    

    if (fileTree.id === folderActiveID && inputValueFile) {
      isFileFounded = true;
        //  كان هنا ايرور ابن كلب وكان السبب اننا مش بنتأكد من ان ال inputValue ===true  فى الحاله دى بقا كده ممكن ال  name  
      //             //  ممكن يكون ب  undifind  والحل فى اننا اتأكدنا قبل ما نستخدمه او كان ممكن نروح على ملف ال  types  ونخلى ال  name : string | undifind  
              

      const updatedFileTree = {
        ...fileTree,
        children: fileTree.children
          ? [...fileTree.children, {
              id: uuidv4(),
              name: inputValueFile,
              isFolder: false,
              content: fileContent,
            }]
          : [{
              id: uuidv4(),
              name: inputValueFile,
              isFolder: false,
              content: fileContent,
            }],
      };

      return updatedFileTree;
    }

    if (fileTree.children && !isFileFounded) {
      return {
        ...fileTree,
        children: fileTree.children.map(file => createFile(file)),
      };
    }

    return fileTree;
  };

  const callCreateNewFile = () => {
    
    const fileTreeClone = { ...allFiles };
    const newFilesTree = createFile(fileTreeClone);
    dispatch(setNewFile(newFilesTree));

    setInputValueFile('')
    setInputValueFolder('')
  };




  let isFolderFounded = false;


  const createFolder = (fileTree: FileInterface): FileInterface => {

    if (fileTree.id === folderActiveID && inputValueFolder) {
      isFolderFounded = true;
        //  كان هنا ايرور ابن كلب وكان السبب اننا مش بنتأكد من ان ال inputValue ===true  فى الحاله دى بقا كده ممكن ال  name  
      //             //  ممكن يكون ب  undifind  والحل فى اننا اتأكدنا قبل ما نستخدمه او كان ممكن نروح على ملف ال  types  ونخلى ال  name : string | undifind  
              

      const updatedFileTree = {
        ...fileTree,
        children: fileTree.children
          ? [...fileTree.children, {
              id: uuidv4(),
              name: inputValueFolder,
              isFolder: true,
              Children:[],
            }]
          : [{
              id: uuidv4(),
              name: inputValueFolder,
              isFolder: true,
              Children:[],
            }],
      };

      return updatedFileTree;
    }

    if (fileTree.children && !isFolderFounded) {
      return {
        ...fileTree,
        children: fileTree.children.map(file => createFolder(file)),
      };
    }

    return fileTree;
  };
  const callCreateNewFolder = () => {
    const fileTreeClone = { ...allFiles };
    const newFilesTree = createFolder(fileTreeClone);
    dispatch(setNewFile(newFilesTree));

    setInputValueFile('')
    setInputValueFolder('')
  };

  useEffect(() => {
    window.addEventListener('click', closeInpCreatorFile);
    return () => {
      window.removeEventListener('click', closeInpCreatorFile);
    };
  }, [inputValueFile,inputValueFolder]); 

  return (
    <div className="ms-3">
      <div className="flex mb-2 items-center">
        <span>
          
          
          {file.isFolder ? (
            <div>

              <div className={`flex items-center cursor-pointer py-1 px-2 rounded-xl w-44 ${file.id === folderActiveID ? " " : ""}`} 
                   onClick={handleFolderClicked}>

                {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
                <RenderFileIcon fileName={file.name} isFolder={file.isFolder} isOpen={isOpen} />
                <span className="text-white ms-2">{file.name}</span>
              </div>


              {file.id === folderActiveID && isClicked_On_CreateFile ? (
                <div className="pe-4 ps-8">
                  <input
                    id="inputCreateFile"
                    ref={inpCreatorFileRef}
                    value={inputValueFile}
                    onChange={(e) => setInputValueFile(e.target.value)} // تحديث الـ state بالقيمة المدخلة
                    onKeyDown={handleKeyPress_toHideFileInput}
                    type="text"
                    className="ps-2 w-[100%] border-2 rounded-sm focus:outline-none"
                  />
                </div>
              )
               :
              
              file.id === folderActiveID && isClicked_On_CreateFolder ?(
                <div className="pe-4 ps-8">
                  <input
                    id="inputCreateFolder"
                    ref={inpCreatorFolderRef}
                    value={inputValueFolder}
                    onChange={(e) => setInputValueFolder(e.target.value)} // تحديث الـ state بالقيمة المدخلة
                    onKeyDown={handleKeyPress_toHideFolderInput}
                    type="text"
                    className="ps-2 w-[100%] border-2 rounded-sm focus:outline-none"
                  />
                </div>
              ) 

              :"" }
            </div>
          ) : 
          
          
          
          
          
          
          
          
          
          
          
          
          (
            <div className="flex items-center ms-4 cursor-pointer" onClick={onFileClicked}>
              <RenderFileIcon fileName={file.name} />
              <span className="text-white ms-2">{file.name}</span>
            </div>
          )}
        </span>
      </div>
      {isOpen && file.children && file.children.map((childFile, index) => (
        <RecursiveComp file={childFile} key={index} />
      ))}
    </div>
  );
};

export default RecursiveComp;
