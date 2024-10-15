

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ReactNode } from "react";
interface IProps {
    defaultLayout?: number[] | undefined;
    leftPanel:ReactNode;
    rightPanel:ReactNode;
    showLeftPanel:boolean;

}

export function ResizeablePanales({ showLeftPanel,defaultLayout = [18, 82] , leftPanel,rightPanel }:IProps) {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  return (
    <PanelGroup autoSaveId={"condition"} direction="horizontal" onLayout={onLayout}>
{
    showLeftPanel&& (
        <>
        
      <Panel collapsible defaultSize={defaultLayout[0]}>{  leftPanel  }</Panel>
      <PanelResizeHandle className=" border-r border-[#ffffff3d]" />

        </>
    )

}


      <Panel defaultSize={defaultLayout[1]}>{rightPanel}</Panel>
    </PanelGroup>
  );
}