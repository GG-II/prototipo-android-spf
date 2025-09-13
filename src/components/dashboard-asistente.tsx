import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, Screen } from '../App';
import { BottomNavigation } from './bottom-navigation';
import { FloatingActionButton } from './floating-action-button';
import { 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle,
  Clock,
  Users,
  FileCheck,
  ChevronRight
} from 'lucide-react';

interface DashboardAsistenteProps {
  user: User | null;
  navigateToScreen: (screen: Screen) => void;
  logout: () => void;
}

export function DashboardAsistente({ user, navigateToScreen, logout }: DashboardAsistenteProps) {
  const territorioData = {
    comunidadesActivas: 5,
    registrosPendientes: 3,
    cumplimientoTerritorial: 65,
    alertasActivas: 2,
    territorio: user?.territory || 'Norte'
  };

  const comunidades = [
    { nombre: 'San Pedro Necta', codigo: 'Norte', cobertura: 7, color: 'bg-blue-500', registros: 1 },
    { nombre: 'Todos Santos', codigo: 'Norte', cobertura: 0, color: 'bg-red-500', registros: 0 },
    { nombre: 'Santa Bárbara', codigo: 'Sur', cobertura: 0, color: 'bg-red-500', registros: 1 },
    { nombre: 'La Democracia', codigo: 'Este', cobertura: 3, color: 'bg-yellow-500', registros: 1 },
    { nombre: 'Santiago Chimaltenango', codigo: 'Oeste', cobertura: 2, color: 'bg-yellow-500', registros: 0 }
  ];

  const registrosPendientes = [
    {
      id: 1,
      auxiliar: 'Ana López',
      comunidad: 'San Pedro Necta',
      fecha: '13 Sep 2025',
      usuarias: 7,
      metodos: 2,
      estado: 'pendiente'
    },
    {
      id: 2,
      auxiliar: 'María Morales',
      comunidad: 'La Democracia',
      fecha: '12 Sep 2025',
      usuarias: 3,
      metodos: 1,
      estado: 'pendiente'
    },
    {
      id: 3,
      auxiliar: 'Carmen Pérez',
      comunidad: 'Santa Bárbara',
      fecha: '11 Sep 2025',
      usuarias: 5,
      metodos: 3,
      estado: 'revision'
    }
  ];

  const getEstadoColor = (cobertura: number) => {
    if (cobertura >= 5) return 'text-green-600';
    if (cobertura >= 1) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEstadoBadge = (estado: string) => {
    const styles = {
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'revision': 'bg-blue-100 text-blue-800',
      'aprobado': 'bg-green-100 text-green-800'
    };
    return styles[estado as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">Asistente Técnico</h1>
            <p className="text-white/80 text-sm">Territorio {territorioData.territorio}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{territorioData.comunidadesActivas} comunidades</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Comunidades Activas */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#10B981]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Comunidades Activas</p>
                  <p className="font-semibold text-lg">{territorioData.comunidadesActivas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registros Pendientes */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Registros Pendientes</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-lg">{territorioData.registrosPendientes}</p>
                    {territorioData.registrosPendientes > 0 && (
                      <Badge variant="secondary" className="bg-[#F59E0B]/10 text-[#F59E0B] text-xs">
                        Nuevos
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cumplimiento Territorial */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#6366F1]/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#6366F1]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Cumplimiento Territorial</p>
                  <p className="font-semibold text-lg">{territorioData.cumplimientoTerritorial}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alertas Activas */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#EF4444]/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Alertas Activas</p>
                  <p className="font-semibold text-lg">{territorioData.alertasActivas}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Comunidades */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Estado por Comunidades</h3>
          <div className="space-y-2">
            {comunidades.map((comunidad, index) => (
              <Card key={index} className="bg-white shadow-sm border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 ${comunidad.color} rounded-full`}></div>
                      <div>
                        <p className="font-medium text-sm">{comunidad.nombre}</p>
                        <p className="text-xs text-gray-500">{comunidad.codigo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${getEstadoColor(comunidad.cobertura)}`}>
                        {comunidad.cobertura}% cobertura
                      </p>
                      <p className="text-xs text-gray-500">
                        {comunidad.registros} registros
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Registros Pendientes de Validación */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Registros Pendientes de Validación</h3>
            <Badge variant="secondary" className="bg-[#F59E0B]/10 text-[#F59E0B]">
              {registrosPendientes.length}
            </Badge>
          </div>
          
          <div className="space-y-2">
            {registrosPendientes.map((registro) => (
              <Card key={registro.id} className="bg-white shadow-sm border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-sm">{registro.auxiliar}</p>
                        <Badge variant="secondary" className={getEstadoBadge(registro.estado)}>
                          {registro.estado}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{registro.comunidad}</p>
                      <p className="text-xs text-gray-400">
                        {registro.usuarias} usuarias, {registro.metodos} métodos • {registro.fecha}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateToScreen('pantalla-validacion')}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAB */}
      <FloatingActionButton
        icon={FileCheck}
        onClick={() => navigateToScreen('pantalla-validacion')}
        label="Validar Registros"
      />

      {/* Bottom Navigation */}
      <BottomNavigation 
        userType="asistente"
        currentScreen="dashboard-asistente"
        onNavigate={navigateToScreen}
      />
    </div>
  );
}