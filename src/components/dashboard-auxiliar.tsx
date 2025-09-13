import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, Screen } from '../App';
import { BottomNavigation } from './bottom-navigation';
import { FloatingActionButton } from './floating-action-button';
import { 
  CheckCircle, 
  Target, 
  RefreshCw, 
  Users, 
  Clock,
  FileText,
  Plus
} from 'lucide-react';

interface DashboardAuxiliarProps {
  user: User | null;
  navigateToScreen: (screen: Screen) => void;
  logout: () => void;
}

export function DashboardAuxiliar({ user, navigateToScreen, logout }: DashboardAuxiliarProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
  
  const dashboardData = {
    registroMes: { completado: true, fecha: '15 Sep 2025' },
    metaAnual: { actual: 1.1, objetivo: 2.1 },
    ultimaSync: { fecha: '13 Sep 2025', hora: '14:30' },
    metodosRegistrados: 24,
    comunidad: user?.community || 'San Pedro Necta'
  };

  const quickActions = [
    {
      title: 'Ver Mi Historial',
      description: 'Registros anteriores',
      icon: FileText,
      action: () => navigateToScreen('historial-personal')
    },
    {
      title: 'Sincronizar Ahora',
      description: 'Enviar datos pendientes',
      icon: RefreshCw,
      action: () => {
        // Simular sincronización
        console.log('Sincronizando datos...');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">Hola, {user?.name}</h1>
            <p className="text-white/80 text-sm">{dashboardData.comunidad}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
            <span className="text-xs text-white/80">Sincronizado</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-white/80 text-sm">Registro de {currentMonth}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Registro del Mes */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#10B981]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Registro del Mes</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-sm">Completado</p>
                    <Badge variant="secondary" className="bg-[#10B981]/10 text-[#10B981] text-xs">
                      {dashboardData.registroMes.fecha}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meta Anual */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#6366F1]/10 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Meta Anual</p>
                  <p className="font-semibold text-sm">{dashboardData.metaAnual.actual}%</p>
                  <Progress 
                    value={(dashboardData.metaAnual.actual / dashboardData.metaAnual.objetivo) * 100} 
                    className="h-1 mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Última Sincronización */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Última Sincronización</p>
                  <p className="font-semibold text-sm">{dashboardData.ultimaSync.fecha}</p>
                  <p className="text-xs text-gray-400">{dashboardData.ultimaSync.hora}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métodos Registrados */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Métodos Registrados</p>
                  <p className="font-semibold text-lg">{dashboardData.metodosRegistrados}</p>
                  <p className="text-xs text-gray-400">usuarias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acciones Rápidas */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Acciones Rápidas</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Card key={index} className="bg-white shadow-sm border-0">
                <CardContent className="p-4">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto p-0"
                    onClick={action.action}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <action.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm">{action.title}</p>
                        <p className="text-xs text-gray-500">{action.description}</p>
                      </div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAB */}
      <FloatingActionButton
        icon={Plus}
        onClick={() => navigateToScreen('registro-datos')}
        label="Nuevo Registro Mensual"
      />

      {/* Bottom Navigation */}
      <BottomNavigation 
        userType="auxiliar"
        currentScreen="dashboard-auxiliar"
        onNavigate={navigateToScreen}
      />
    </div>
  );
}