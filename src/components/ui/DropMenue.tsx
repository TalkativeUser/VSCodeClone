import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setClickedFileAction, setOpendFile } from "../../app/features/fileTreeSlice"
import { RootState } from "../../app/store"


interface IProps {

    position:{

        x:number,
        y:number
    },
    setShowMenu: ( val:boolean )=>void
}

export default function DropMenue({position:{x,y},setShowMenu }:IProps) {

    const menuRef=useRef <HTMLDivElement> (null)
    const closeMenu=(e:MouseEvent)=> {
        if (menuRef.current&&! menuRef.current.contains(e.target as Node) )
            setShowMenu(false)
        
        
    }

    const {openedFiles , tapIDToRemove}=useSelector((store:RootState) => store.tree)
    const dispatch=useDispatch()

    useEffect(()=>{


        window.addEventListener('click',closeMenu)

        return ()=>{

            window.removeEventListener('click',closeMenu)
        }



    },[setShowMenu])

  return (
    <div ref={menuRef}  >
          <ul 
            style={{ position:"absolute" ,left:x,top:y }} 
             className='bg-black text-[#ffffff82] w-44  py-2 rounded-sm inline-block border border-[#ffffff82] ' >
            <li  className='px-5 cursor-pointer '
            
            onClick={()=>{
         const filtred=openedFiles.filter(file => file.id !==  tapIDToRemove )
         dispatch(setOpendFile(filtred))
         

         const lastTab = filtred[filtred.length - 1];
         const { id, name, content } = lastTab;
         dispatch(setClickedFileAction({ activeFileID: id, fileContent: content, filename: name }));

          setShowMenu(false)
                

            }}
            
            >Close Tap </li>

            <li className='px-5 border-t border-[#ffffff82] cursor-pointer' 
            
            onClick={()=>{

               dispatch(setOpendFile([]))
                
            }}
            
            >Close All Taps </li>

        </ul>
    </div> 
      
  )
}
