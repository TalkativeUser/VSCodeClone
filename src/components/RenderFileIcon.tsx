import IconImage from "./IconImage"
import FileIcon from "./SVG/File"

interface Iprops {

    fileName:string,
    isFolder?:boolean,
    isOpen?:boolean
}

const extensionIconPathes : Record<string ,string> ={

// files 
  tsx:"./public/icons/react_ts",
  jsx:"./public/icons/react",
html:"./public/icons/html",
css:"./public/icons/css",
ts:"./public/icons/typescript",
js:"./public/icons/javascript",
json:"./public/icons/json",
gitignore:"./public/icons/git",
scss:"./public/icons/sass",

//  Folders 

node_modules:"./public/icons/folder-node",
public:"./public/icons/folder-public",
src:"./public/icons/folder-src",
components:"./public/icons/folder-components"




}



export default function RenderFileIcon({fileName,isOpen,isFolder}:Iprops) {
    const extention=fileName.split('.').pop()
//  ملحوظه عالسريع 

//  السطرين دول زى بعض وبيأدو نفس الغرض بالظبط لكن الفرق فى 

//   1- if ( Object.prototype.hasOwnProperty.call(extensionIconPathes, " myProperty ")) معناها ان انا بتأكد هل الاوبجيكت  extensionIconPathes  شايل الخاصيه myProperty
//  2-  if ( extensionIconPathes.hasOwnProperty(" myProperty "))  هنا نفس الكلام لكن احنا بنستخدم السطر اللى الاولانى عشان وارد جدا ان الاوبجيكت  extensionIconPathes  شايل 
// خاصيه بنفس الاسم اللى هو hasOwnProperty فى الحاله دى الدنيا هتبوظ لان كده هيحصل تضارب ما بين اسم ال hasOwnProperty المحجوزه فى اللغه وما بين ال  hasOwnProperty
//   اللى جوه الاوبجيكت بتاعى 

  if (extention&& Object.prototype.hasOwnProperty.call(extensionIconPathes,extention)) {

  const iconPath=isFolder? isOpen?
   
  `${extensionIconPathes[extention]}-open.svg `:
   
  `${extensionIconPathes[extention]}.svg `:
    
    `${extensionIconPathes[extention]}.svg `

    return <IconImage src={iconPath} />

  }




if (isFolder) {

if(isOpen)
  return  <IconImage src="./public/icons/folder-default-open.svg" />
else return  <IconImage src="/.public/icons/folder-default.svg" />

}






  
  
    return (<FileIcon />
  )
}
