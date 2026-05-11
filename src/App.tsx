import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { TabBar } from './components/tabs/TabBar';
import { DynamicWorkspace } from './components/tabs/DynamicWorkspace';
import { useTabStore } from './store/tabStore';

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { tabs } = useTabStore();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar fixo */}
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopBar fixo */}
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* TabBar - mostra abas abertas */}
        {tabs.length > 0 && <TabBar />}

        {/* Workspace dinâmico */}
        <DynamicWorkspace />
      </div>
    </div>
  );
}

export default App;
