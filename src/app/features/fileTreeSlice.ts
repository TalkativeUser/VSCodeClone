import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileInterface } from "../../interfaces";
import { fileTree } from "../../data/FileTree";

interface IClickedFile {

    filename:string;
    fileContent:string|undefined,
    activeFileID:string|null;
}


interface initValuesInterface {


openedFiles:FileInterface[] ,
clickedFile:IClickedFile,
tapIDToRemove:string|null,
folderActiveID:string|null , 
allFiles: FileInterface,
isClicked_On_CreateFile:boolean;
isClicked_On_CreateFolder:boolean;
newFile:FileInterface ,
newFolder:FileInterface ,

}


const initialState:initValuesInterface={

    openedFiles:[],
    clickedFile:{

        filename:"",
        fileContent:"",
        activeFileID:''
    } ,

    tapIDToRemove:'',
    folderActiveID:'',
    allFiles:fileTree,
    isClicked_On_CreateFile:false,
    isClicked_On_CreateFolder:false,
    newFile:{

        id:'',
        name:'',
        isFolder:false , 
        content:"",
        },

    newFolder:{

        id:'',
        name:'',
        isFolder:true , 
        children:[]
    },
    
    



}


export const fileTreeSlice= createSlice({

name:"fileTree",
initialState,
reducers:{

        setOpendFile:(prevState,newState:PayloadAction<FileInterface[]>)=>{


                prevState.openedFiles=newState.payload;

            },

            setClickedFileAction:(prevState,newState:PayloadAction<IClickedFile>)=>{  


            prevState.clickedFile=newState.payload;  

        },

            setTapIDToRemoveAction:(prevState,newState:PayloadAction<string|null>)=>{  


            prevState.tapIDToRemove=newState.payload;  

        },
            setFolderActiveID:(prevState,newState:PayloadAction<string|null>)=>{  

               
            prevState.folderActiveID=newState.payload;  

        },

        //  دى موحده على ال  file and folder 
            setNewFile:(prevState,newState:PayloadAction<FileInterface>)=>{  

                //  هنا المفروض تبعتلى الفايلات الجديده بعد ما ضيفت الملف الجديد عشان اخذنهالك هنا 
            prevState.allFiles=newState.payload               
            // prevState.allFiles =newState.payload;  

        },
      


         setIsClicked_On_CreateFile:(prevState,newState:PayloadAction<boolean>)=>{  

                
            prevState.isClicked_On_CreateFile =newState.payload 
                          

        },
         setIsClicked_On_CreateFolder:(prevState,newState:PayloadAction<boolean>)=>{  

                
            prevState.isClicked_On_CreateFolder =newState.payload  
             

        },
     

        catchValueAndCreateNewFile: ( prevState,newState:PayloadAction<FileInterface> )=> {

                    
                     prevState.newFile=newState.payload; 
                    
                     
        },
        catchValueAndCreateNewFolder: ( prevState,newState:PayloadAction<FileInterface> )=> {


                     prevState.newFolder=newState.payload; 
           
                     
        }
     


}


})

export const fileTreeReducers=  fileTreeSlice.reducer
export const {setOpendFile,
              setClickedFileAction,
               setTapIDToRemoveAction ,
                setFolderActiveID ,setNewFile,
                setIsClicked_On_CreateFile,catchValueAndCreateNewFile,
                setIsClicked_On_CreateFolder
            }=  fileTreeSlice.actions