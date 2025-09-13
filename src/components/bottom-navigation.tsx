import React from 'react';
import { UserType, Screen } from '../App';
import { 
  Home, 
  FileText, 
  History, 
  User,
  CheckSquare,
  MapPin,
  BarChart3,
  Settings,
  TrendingUp,
  Database
} from 'lucide-react';

interface BottomNavigationProps {
  userType: UserType;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

interface NavItem {
  id: Screen;
  label: string;
  icon: React.ElementType;
}

export function BottomNavigation({ userType, currentScreen, onNavigate }: BottomNavigationProps) {
  const getNavItemsForUserType = (type: UserType): NavItem[] => {
    switch (type) {
      case 'auxiliar':
        return [
          { id: 'dashboard-auxiliar', label: 'Inicio', icon: Home },
          { id: 'registro-datos', label: 'Registros', icon: FileText },
          { id: 'historial-personal', label: 'Mi Historial', icon: History },
          { id: 'login', label: 'Perfil', icon: User }
        ];
      case 'asistente':
        return [
          { id: 'dashboard-asistente', label: 'Dashboard', icon: Home },
          { id: 'pantalla-validacion', label: 'Validación', icon: CheckSquare },
          { id: 'dashboard-asistente', label: 'Territorio', icon: MapPin },
          { id: 'reportes-avanzados', label: 'Reportes', icon: BarChart3 }
        ];
      case 'encargado':
        return [
          { id: 'dashboard-encargado', label: 'Dashboard', icon: Home },
          { id: 'reportes-avanzados', label: 'Reportes', icon: BarChart3 },
          { id: 'configuracion-metas', label: 'Configuración', icon: Settings },
          { id: 'dashboard-encargado', label: 'Análisis', icon: TrendingUp }
        ];
      case 'coordinador':
        return [
          { id: 'dashboard-coordinador', label: 'Estratégico', icon: Home },
          { id: 'dashboard-coordinador', label: 'Comparativo', icon: TrendingUp },
          { id: 'dashboard-coordinador', label: 'Calidad', icon: Database },
          { id: 'configuracion-metas', label: 'Configuración', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItemsForUserType(userType);

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            const IconComponent = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-[#6366F1] bg-[#6366F1]/10' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-[#6366F1]' : 'text-gray-500'}`} />
                <span className={`text-xs ${isActive ? 'text-[#6366F1]' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}