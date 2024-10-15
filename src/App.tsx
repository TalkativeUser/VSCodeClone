import { useDispatch, useSelector } from 'react-redux';
import Preview from './components/Preview';
import RecursiveComponent from './components/RecursiveComp';
import { ResizeablePanales } from './components/ResizeablePanales';
import WelcomeTab from './components/SVG/WelcomeTap';
import { RootState } from './app/store';
import { setIsClicked_On_CreateFile, setIsClicked_On_CreateFolder } from './app/features/fileTreeSlice';
 
const App = () => {


const {openedFiles , allFiles}=useSelector((store:RootState)=> store.tree)
const dispatch=useDispatch()


const handleOnClickedCreateFile =()=> {

  

      dispatch(setIsClicked_On_CreateFile(true) )  
      dispatch(setIsClicked_On_CreateFolder(false) )  


}
const handleOnClickedCreateFolder =()=> {

  

dispatch(setIsClicked_On_CreateFolder(true) )  
dispatch(setIsClicked_On_CreateFile(false) )  


}



  return (
    <div className="flex h-screen  ">
     
      <div className='w-[100%]' >

     
      <ResizeablePanales showLeftPanel  leftPanel={

              <div className="mt-5 flex flex-col justify-center items-center " >

                   <div className='flex items-center justify-end gap-3 me-5  ' >
            
                      <i  id='iconCreateFile' className="fa-solid fa-file-circle-plus text-white text-xl cursor-pointer " 
                      
                        onClick={handleOnClickedCreateFile}></i> 

                        <i id='iconCreateFolder' className="fa-solid fa-folder-plus text-white text-xl cursor-pointer "
                        
                        onClick={handleOnClickedCreateFolder}
                        ></i> 
                       

                   
                   </div>

                  <RecursiveComponent file={allFiles}/>
                  <p  className='text-white text-lg text-center max-w-44 '  > hello world i'm from eygpt i'm 23 old yars i'm wrok in development web </p>

              </div> 
                              }



                    rightPanel={openedFiles.length ? <Preview /> : <WelcomeTab />}



/>
      </div>


     
    </div>
  );
};

export default App;
