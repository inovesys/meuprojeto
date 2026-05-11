import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  module: string;
  params?: Record<string, any>;
  data?: any;
  isDirty?: boolean;
  timestamp: number;
}

interface TabStore {
  tabs: Tab[];
  activeTabId: string | null;

  // Tab Management
  openTab: (tab: Omit<Tab, 'id' | 'timestamp'>) => string;
  closeTab: (tabId: string) => void;
  closeAllTabs: () => void;
  closeOtherTabs: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;

  // Tab Data
  updateTabData: (tabId: string, data: any) => void;
  updateTabParams: (tabId: string, params: Record<string, any>) => void;
  setTabDirty: (tabId: string, isDirty: boolean) => void;

  // Utilities
  getTabById: (tabId: string) => Tab | undefined;
  getTabsByModule: (module: string) => Tab[];
  findOrCreateTab: (module: string, params?: Record<string, any>) => string;
  canCloseTab: (tabId: string) => boolean;
}

const createTabId = () => `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useTabStore = create<TabStore>()(
  persist(
    (set, get) => ({
      tabs: [],
      activeTabId: null,

      openTab: (tab) => {
        const tabId = createTabId();
        const newTab: Tab = {
          ...tab,
          id: tabId,
          timestamp: Date.now(),
        };

        set((state) => ({
          tabs: [...state.tabs, newTab],
          activeTabId: tabId,
        }));

        return tabId;
      },

      closeTab: (tabId) => {
        set((state) => {
          const filteredTabs = state.tabs.filter((t) => t.id !== tabId);
          let newActiveTabId = state.activeTabId;

          if (state.activeTabId === tabId) {
            newActiveTabId = filteredTabs.length > 0 ? filteredTabs[filteredTabs.length - 1].id : null;
          }

          return {
            tabs: filteredTabs,
            activeTabId: newActiveTabId,
          };
        });
      },

      closeAllTabs: () => {
        set({
          tabs: [],
          activeTabId: null,
        });
      },

      closeOtherTabs: (tabId) => {
        set((state) => ({
          tabs: state.tabs.filter((t) => t.id === tabId),
          activeTabId: tabId,
        }));
      },

      setActiveTab: (tabId) => {
        const tab = get().tabs.find((t) => t.id === tabId);
        if (tab) {
          set({ activeTabId: tabId });
        }
      },

      updateTabData: (tabId, data) => {
        set((state) => ({
          tabs: state.tabs.map((t) => (t.id === tabId ? { ...t, data } : t)),
        }));
      },

      updateTabParams: (tabId, params) => {
        set((state) => ({
          tabs: state.tabs.map((t) => (t.id === tabId ? { ...t, params: { ...t.params, ...params } } : t)),
        }));
      },

      setTabDirty: (tabId, isDirty) => {
        set((state) => ({
          tabs: state.tabs.map((t) => (t.id === tabId ? { ...t, isDirty } : t)),
        }));
      },

      getTabById: (tabId) => {
        return get().tabs.find((t) => t.id === tabId);
      },

      getTabsByModule: (module) => {
        return get().tabs.filter((t) => t.module === module);
      },

      findOrCreateTab: (module, params) => {
        const existingTab = get().tabs.find((t) => t.module === module && JSON.stringify(t.params) === JSON.stringify(params));

        if (existingTab) {
          get().setActiveTab(existingTab.id);
          return existingTab.id;
        }

        return get().openTab({
          label: module,
          module,
          params,
        });
      },

      canCloseTab: (tabId) => {
        const tab = get().getTabById(tabId);
        if (!tab) return true;
        return !tab.isDirty;
      },
    }),
    {
      name: 'inovesys-tabs',
      partialize: (state) => ({
        tabs: state.tabs.map((t) => ({
          ...t,
          data: undefined, // Não persistir dados grandes
        })),
        activeTabId: state.activeTabId,
      }),
    }
  )
);
