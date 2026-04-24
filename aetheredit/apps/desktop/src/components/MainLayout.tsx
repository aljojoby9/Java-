import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { MenuBar } from '@components/MenuBar';
import { Toolbar } from '@components/Toolbar';
import { MediaBrowser } from '@components/MediaBrowser';
import { ViewerSection } from '@components/ViewerSection';
import { Timeline } from '@components/Timeline';
import { InspectorPanel } from '@components/InspectorPanel';
import { useAppStore } from '@store/appStore';

export const MainLayout: React.FC = () => {
  const { workspace, setWorkspaceLayout } = useAppStore();

  return (
    <div className="flex flex-col h-screen w-screen bg-background text-text overflow-hidden">
      {/* Top Menu Bar */}
      <MenuBar />
      
      {/* Toolbar */}
      <Toolbar />
      
      {/* Main Content Area with Resizable Panels */}
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Panel - Media Browser */}
          <Panel
            defaultSize={workspace.leftPanelWidth}
            minSize={15}
            maxSize={35}
            onResize={(size) => setWorkspaceLayout({ leftPanelWidth: size })}
          >
            <MediaBrowser />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors cursor-col-resize" />
          
          {/* Center Area - Viewer + Timeline */}
          <PanelGroup direction="vertical">
            {/* Top - Viewer Section */}
            <Panel
              defaultSize={workspace.viewerHeight}
              minSize={30}
              maxSize={70}
              onResize={(size) => setWorkspaceLayout({ viewerHeight: size })}
            >
              <ViewerSection />
            </Panel>
            
            <PanelResizeHandle className="h-1 bg-border hover:bg-primary transition-colors cursor-row-resize" />
            
            {/* Bottom - Timeline */}
            <Panel
              defaultSize={workspace.timelineHeight}
              minSize={25}
              maxSize={65}
              onResize={(size) => setWorkspaceLayout({ timelineHeight: size })}
            >
              <Timeline />
            </Panel>
          </PanelGroup>
          
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors cursor-col-resize" />
          
          {/* Right Panel - Inspector */}
          <Panel
            defaultSize={workspace.rightPanelWidth}
            minSize={20}
            maxSize={40}
            onResize={(size) => setWorkspaceLayout({ rightPanelWidth: size })}
          >
            <InspectorPanel />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
