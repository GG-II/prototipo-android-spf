import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { User, Screen } from '../App';
import { BottomNavigation } from './bottom-navigation';
import { 
  TrendingUp, 
  Award, 
  Database, 
  AlertTriangle,
  BarChart3,
  Target
} from 'lucide-react';

interface DashboardCoordinadorProps {
  user: User | null;
  navigateToScreen: (screen: Screen) => void;
  logout: () => void;
}

export function DashboardCoordinador({ user, navigateToScreen, logout }: DashboardCoordinadorProps) {
  const metricas = {
    cumplimientoMunicipal: 68,
    posicionRanking: 3,
    totalMunicipios: 12,
    proyeccionVsRealidad: 85,
    calidadDatos: 92
  };

  const comparativoIntermunicipal = [
    { municipio: 'Huehuetenango', cumplimiento: 78, posicion: 1 },
    { municipio: 'Chiantla', cumplimiento: 72, posicion: 2 },
    { municipio: 'Malacatancito', cumplimiento: 68, posicion: 3 },
    { municipio: 'Todos Santos', cumplimiento: 65, posicion: 4 },
    { municipio: 'San Pedro Necta', cumplimiento: 62, posicion: 5 }
  ];

  const alertasCriticas = [
    { tipo: 'Meta Anual', descripcion: 'Municipios con riesgo de no cumplir meta 2025', cantidad: 4 },
    { tipo: 'Calidad', descripcion: 'Datos inconsistentes requieren validación', cantidad: 2 },
    { tipo: 'Cobertura', descripcion: 'Comunidades sin registros por 2+ meses', cantidad: 6 }
  ];

  const tendenciaAnual = [
    { periodo: '2023', valor: 45 },
    { periodo: '2024', valor: 58 },
    { periodo: '2025', valor: 68 }
  ];

  const getPositionColor = (posicion: number) => {
    if (posicion <= 2) return 'text-green-600';
    if (posicion <= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPositionBadge = (posicion: number) => {
    if (posicion <= 2) return 'bg-green-100 text-green-800';
    if (posicion <= 4) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold">Vista Estratégica</h1>
            <p className="text-white/80 text-sm">Coordinación Municipal - Huehuetenango</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-xs">Año 2025</p>
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              #{metricas.posicionRanking} de {metricas.totalMunicipios}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Métricas Estratégicas */}
        <div className="grid grid-cols-2 gap-4">
          {/* Cumplimiento Municipal */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-[#6366F1]/10 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#6366F1]" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Cumplimiento Municipal</p>
              <p className="font-semibold text-2xl">{metricas.cumplimientoMunicipal}%</p>
              <Progress value={metricas.cumplimientoMunicipal} className="h-1 mt-2" />
            </CardContent>
          </Card>

          {/* Ranking Intermunicipal */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#10B981]" />
                </div>
                <Badge className={getPositionBadge(metricas.posicionRanking)}>
                  #{metricas.posicionRanking}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">Ranking Intermunicipal</p>
              <p className={`font-semibold text-lg ${getPositionColor(metricas.posicionRanking)}`}>
                Posición {metricas.posicionRanking}
              </p>
              <p className="text-xs text-gray-400">de {metricas.totalMunicipios} municipios</p>
            </CardContent>
          </Card>

          {/* Proyección vs Realidad */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Proyección vs Realidad</p>
              <p className="font-semibold text-2xl">{metricas.proyeccionVsRealidad}%</p>
              <p className="text-xs text-gray-400">en línea con proyección</p>
            </CardContent>
          </Card>

          {/* Calidad de Datos */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                  <Database className="w-5 h-5 text-[#10B981]" />
                </div>
              </div>
              <p className="text-xs text-gray-500">Calidad de Datos</p>
              <p className="font-semibold text-2xl">{metricas.calidadDatos}%</p>
              <p className="text-xs text-gray-400">indicador de calidad</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Tendencias Anuales */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg">Tendencias Anuales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end space-x-6 h-32 mb-4">
              {tendenciaAnual.map((año, index) => (
                <div key={año.periodo} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-[#6366F1] to-[#3B82F6] rounded-t-lg"
                    style={{ height: `${(año.valor / 80) * 100}%` }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-2">{año.periodo}</p>
                  <p className="text-xs font-semibold">{año.valor}%</p>
                </div>
              ))}
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800">
                Tendencia positiva: +23% de crecimiento en 2 años
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Comparativo Intermunicipal */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg">Comparativo Intermunicipal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {comparativoIntermunicipal.map((municipio, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <Badge className={getPositionBadge(municipio.posicion)} variant="secondary">
                      #{municipio.posicion}
                    </Badge>
                    <p className="font-medium text-sm">{municipio.municipio}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{municipio.cumplimiento}%</p>
                    <Progress value={municipio.cumplimiento} className="h-1 w-16 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas Críticas que Requieren Atención */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
              <span>Alertas Críticas que Requieren Atención</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertasCriticas.map((alerta, index) => (
                <div key={index} className="border-l-4 border-l-red-500 bg-red-50 p-3 rounded-r-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-red-800">{alerta.tipo}</p>
                      <p className="text-xs text-red-700">{alerta.descripcion}</p>
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {alerta.cantidad}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Análisis Comparativo Año vs Año Anterior */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg">Análisis Comparativo 2025 vs 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-500">Mejora en Cumplimiento</p>
                <p className="text-2xl font-semibold text-green-600">+10%</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-500">Aumento en Cobertura</p>
                <p className="text-2xl font-semibold text-blue-600">+15%</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-500">Comunidades Activas</p>
                <p className="text-2xl font-semibold text-purple-600">+5</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-gray-500">Calidad de Datos</p>
                <p className="text-2xl font-semibold text-orange-600">+8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        userType="coordinador"
        currentScreen="dashboard-coordinador"
        onNavigate={navigateToScreen}
      />
    </div>
  );
}