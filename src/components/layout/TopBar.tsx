import { Menu, Bell, Settings, LogOut, User } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
        >
          <Menu size={20} className="text-slate-600" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-xl font-bold text-slate-900">InoveSys ERP</h1>
          <p className="text-xs text-slate-500">Sistema de Gestão Empresarial</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Settings */}
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Settings size={20} className="text-slate-600" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <User size={20} className="text-slate-600" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b border-slate-200">
                <p className="text-sm font-medium text-slate-900">Usuário</p>
                <p className="text-xs text-slate-600">user@example.com</p>
              </div>

              <div className="space-y-1 p-2">
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded transition-colors flex items-center gap-2">
                  <User size={16} />
                  <span>Meu Perfil</span>
                </button>

                <button className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded transition-colors flex items-center gap-2">
                  <Settings size={16} />
                  <span>Configurações</span>
                </button>

                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-2">
                  <LogOut size={16} />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
