import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, Screen } from '../App';
import { BottomNavigation } from './bottom-navigation';
import { FloatingActionButton } from './floating-action-button';
import { 
  TrendingUp, 
  Users, 
  Target, 
  AlertTriangle,
  MapPin,
  BarChart3,
  Settings
} from 'lucide-react';

interface DashboardEncargadoProps {
  user: User | null;
  navigateToScreen: (screen: Screen) => void;
  logout: () => void;
}

export function DashboardEncargado({ user, navigateToScreen, logout }: DashboardEncargadoProps) {
  const metricas = {
    usuariasAtendidas: { actual: 24, cambio: 12, tendencia: 'up' },
    cumplimientoAnual: { actual: 1.1, objetivo: 2.1, cambio: 5 },
    metaAnual: 2100,
    alertasActivas: 2
  };

  const comunidades = [
    { nombre: 'San Pedro Necta', direccion: 'Norte', cobertura: 7, color: 'bg-green-500' },
    { nombre: 'Todos Santos', direccion: 'Norte', cobertura: 0, color: 'bg-red-500' },
    { nombre: 'Santa Bárbara', direccion: 'Sur', cobertura: 0, color: 'bg-red-500' },
    { nombre: 'La Democracia', direccion: 'Este', cobertura: 3, color: 'bg-yellow-500' }
  ];

  const tendenciasMensuales = [
    { mes: 'Jul', valor: 18 },
    { mes: 'Ago', valor: 20 },
    { mes: 'Sep', valor: 24 }
  ];

  const alertas = [
    { id: 1, tipo: 'Meta', descripcion: 'Cobertura por debajo del 50% en 3 comunidades', prioridad: 'alta' },
    { id: 2, tipo: 'Sincronización', descripcion: 'Registros pendientes de sincronización', prioridad: 'media' }
  ];

  const getAlertColor = (prioridad: string) => {
    const colors = {
      'alta': 'border-l-red-500 bg-red-50',
      'media': 'border-l-yellow-500 bg-yellow-50',
      'baja': 'border-l-blue-500 bg-blue-50'
    };
    return colors[prioridad as keyof typeof colors] || colors.media;
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">Dashboard Ejecutivo</h1>
            <p className="text-white/80 text-sm">{user?.name} - {user?.community}</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-xs">Septiembre 2025</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Métricas Principales */}
        <div className="grid grid-cols-2 gap-4">
          {/* Usuarias Atendidas */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#10B981]" />
                </div>
                <Badge variant="secondary" className="bg-[#10B981]/10 text-[#10B981] text-xs">
                  +{metricas.usuariasAtendidas.cambio}%
                </Badge>
              </div>
              <p className="text-xs text-gray-500">Usuarias Atendidas</p>
              <p className="font-semibold text-2xl">{metricas.usuariasAtendidas.actual}</p>
              <p className="text-xs text-gray-400">vs mes anterior</p>
            </CardContent>
          </Card>

          {/* Cumplimiento Anual */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-[#6366F1]/10 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#6366F1]" />
                </div>
                <Badge variant="secondary" className="bg-[#6366F1]/10 text-[#6366F1] text-xs">
                  +{metricas.cumplimientoAnual.cambio}%
                </Badge>
              </div>
              <p className="text-xs text-gray-500">Cumplimiento Anual</p>
              <p className="font-semibold text-2xl">{metricas.cumplimientoAnual.actual}%</p>
              <Progress 
                value={(metricas.cumplimientoAnual.actual / metricas.cumplimientoAnual.objetivo) * 100} 
                className="h-1 mt-2"
              />
            </CardContent>
          </Card>

          {/* Meta Anual */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Meta Anual</p>
              <p className="font-semibold text-2xl">{metricas.metaAnual.toLocaleString()}</p>
              <p className="text-xs text-gray-400">actualizada en enero</p>
            </CardContent>
          </Card>

          {/* Alertas Activas */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-[#EF4444]/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                </div>
                <Badge variant="secondary" className="bg-[#EF4444]/10 text-[#EF4444] text-xs">
                  Requieren atención
                </Badge>
              </div>
              <p className="text-xs text-gray-500">Alertas Activas</p>
              <p className="font-semibold text-2xl">{metricas.alertasActivas}</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Tendencias */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg">Tendencias Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-4 h-24">
              {tendenciasMensuales.map((mes, index) => (
                <div key={mes.mes} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-[#6366F1] to-[#3B82F6] rounded-t-lg"
                    style={{ height: `${(mes.valor / 30) * 100}%` }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-2">{mes.mes}</p>
                  <p className="text-xs font-semibold">{mes.valor}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estado por Comunidades */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg">Estado por Comunidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {comunidades.map((comunidad, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${comunidad.color} rounded-full`}></div>
                    <div>
                      <p className="font-medium text-sm">{comunidad.nombre}</p>
                      <p className="text-xs text-gray-500">{comunidad.direccion}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{comunidad.cobertura}%</p>
                    <p className="text-xs text-gray-500">cobertura</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas Críticas */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg">Alertas Críticas que Requieren Atención</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertas.map((alerta) => (
                <div key={alerta.id} className={`border-l-4 p-3 rounded-r-lg ${getAlertColor(alerta.prioridad)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{alerta.tipo}</p>
                      <p className="text-xs text-gray-600">{alerta.descripcion}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {alerta.prioridad}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAB */}
      <FloatingActionButton
        icon={BarChart3}
        onClick={() => navigateToScreen('reportes-avanzados')}
        label="Generar Reportes"
      />

      {/* Bottom Navigation */}
      <BottomNavigation 
        userType="encargado"
        currentScreen="dashboard-encargado"
        onNavigate={navigateToScreen}
      />
    </div>
  );
}