import { useSelector } from "react-redux";

import { RootState } from "../app/store";
import OpenedFilesBar from "./OpenedFileBar";
import FileSyntaxHighlighter from "./StyleSyntaxCode";

const Preview = () => {
  const {
    clickedFile: { fileContent },
  } = useSelector(({ tree }: RootState) => tree);

  return (
    <>
      <OpenedFilesBar />
      <FileSyntaxHighlighter content={fileContent} />
    </>
  );
};

export default Preview;
