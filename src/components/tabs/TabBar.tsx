import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTabStore, type Tab } from '../../store/tabStore';
import { useState } from 'react';

export function TabBar() {
  const { tabs, activeTabId, closeTab, setActiveTab, closeOtherTabs, closeAllTabs } = useTabStore();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  if (tabs.length === 0) return null;

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('tab-container');
    if (!container) return;

    const scrollAmount = 200;
    const newPosition = direction === 'left' ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
    container.scrollLeft = newPosition;
    setScrollPosition(newPosition);

    updateArrows(container);
  };

  const updateArrows = (container: HTMLElement) => {
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
  };

  const handleTabScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    updateArrows(container);
  };

  return (
    <div className="bg-slate-50 border-b border-slate-200 h-11 flex items-center gap-1 px-2 select-none">
      {/* Left Scroll Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => handleScroll('left')}
          className="flex-shrink-0 p-1 hover:bg-slate-200 rounded transition-colors"
          title="Scroll esquerda"
        >
          <ChevronLeft size={16} className="text-slate-600" />
        </button>
      )}

      {/* Tabs Container */}
      <div
        id="tab-container"
        className="flex-1 flex gap-0.5 overflow-x-auto scrollbar-hide"
        onScroll={handleTabScroll}
      >
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            isActive={activeTabId === tab.id}
            onClose={() => closeTab(tab.id)}
            onActivate={() => setActiveTab(tab.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              // Menu de contexto (implementar depois se necessário)
            }}
          />
        ))}
      </div>

      {/* Right Scroll Arrow */}
      {showRightArrow && (
        <button
          onClick={() => handleScroll('right')}
          className="flex-shrink-0 p-1 hover:bg-slate-200 rounded transition-colors"
          title="Scroll direita"
        >
          <ChevronRight size={16} className="text-slate-600" />
        </button>
      )}

      {/* Tab Actions Menu */}
      <div className="flex-shrink-0 flex items-center gap-1 pl-2 border-l border-slate-200">
        <button
          onClick={() => closeAllTabs()}
          className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors"
          title="Fechar todas as abas"
        >
          ✕ Todas
        </button>
      </div>

      {/* Custom scrollbar hide style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

interface TabItemProps {
  tab: Tab;
  isActive: boolean;
  onClose: () => void;
  onActivate: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

function TabItem({ tab, isActive, onClose, onActivate, onContextMenu }: TabItemProps) {
  const { closeOtherTabs } = useTabStore();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onClick={onActivate}
      onContextMenu={onContextMenu}
      className={`
        group flex items-center gap-2 px-3 h-10 rounded-t-lg cursor-pointer transition-all
        whitespace-nowrap min-w-max relative
        ${
          isActive
            ? 'bg-white border-b-2 border-emerald-500 text-slate-900'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-150 border-b border-slate-200'
        }
      `}
      title={tab.label}
    >
      {/* Dirty Indicator */}
      {tab.isDirty && <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />}

      {/* Tab Label */}
      <span className="text-sm font-medium truncate max-w-xs">{tab.label}</span>

      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={`
          flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity
          p-0.5 hover:bg-slate-300 rounded
          ${isActive ? 'opacity-100' : ''}
        `}
        title="Fechar aba"
      >
        <X size={14} className="text-slate-600" />
      </button>

      {/* Context Menu Indicator (hover para exibir menu) */}
      {isActive && showMenu && (
        <TabContextMenu
          onCloseOthers={() => {
            closeOtherTabs(tab.id);
            setShowMenu(false);
          }}
          onClose={() => {
            onClose();
            setShowMenu(false);
          }}
        />
      )}
    </div>
  );
}

interface TabContextMenuProps {
  onCloseOthers: () => void;
  onClose: () => void;
}

function TabContextMenu({ onCloseOthers, onClose }: TabContextMenuProps) {
  return (
    <div className="absolute top-full left-0 bg-white border border-slate-200 rounded shadow-lg z-50 min-w-max">
      <button
        onClick={onCloseOthers}
        className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-100 transition-colors"
      >
        Fechar Outras
      </button>
      <button onClick={onClose} className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-100 transition-colors">
        Fechar Esta
      </button>
    </div>
  );
}
