import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import OpenedFilesBarTab from './OpenedFilesBarTap';
import { useState } from 'react';
import DropMenue from './ui/DropMenue';

const OpenedFilesBar = () => {
  const { openedFiles } = useSelector((state: RootState) => state.tree);
  const [menuPosition,setMenuPostion]=useState({x:0,y:0})
const [showMenu,setShowMenu]=useState(false)

  return (
    <div>
      <ul 
         onContextMenu={(e)=> { 

          e.preventDefault()
         setMenuPostion({x:e.clientX,y:e.clientY})
         setShowMenu(true)
          

   }}
      className="flex items-center  "  style={{borderBottom:"0.5px solid #474040"}} >
        
     {showMenu? <DropMenue position={menuPosition} setShowMenu={setShowMenu}  />:""  }
       
        {openedFiles.map((file) => (
      
           <OpenedFilesBarTab file={file}  key={file.id} />
      
        ))}
      </ul>

  
    </div>
  );
};

export default OpenedFilesBar;
