import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, Screen } from '../App';
import { BottomNavigation } from './bottom-navigation';
import { 
  ArrowLeft,
  Calendar,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Users
} from 'lucide-react';

interface HistorialPersonalProps {
  user: User | null;
  navigateToScreen: (screen: Screen) => void;
  logout: () => void;
}

interface RegistroHistorial {
  id: number;
  mes: string;
  año: number;
  totalUsuarias: number;
  fechaRegistro: string;
  fechaSync: string | null;
  estado: 'sincronizado' | 'pendiente' | 'error';
  editable: boolean;
  detalle: {
    inyecciones: number;
    orales: number;
    dispositivos: number;
    barrera: number;
    naturales: number;
    definitivos: number;
  };
}

export function HistorialPersonal({ user, navigateToScreen, logout }: HistorialPersonalProps) {
  const [selectedRegistro, setSelectedRegistro] = useState<RegistroHistorial | null>(null);

  const historialRegistros: RegistroHistorial[] = [
    {
      id: 1,
      mes: 'Septiembre',
      año: 2025,
      totalUsuarias: 24,
      fechaRegistro: '13 Sep 2025',
      fechaSync: '13 Sep 2025 14:30',
      estado: 'sincronizado',
      editable: true,
      detalle: {
        inyecciones: 12,
        orales: 8,
        dispositivos: 2,
        barrera: 2,
        naturales: 0,
        definitivos: 0
      }
    },
    {
      id: 2,
      mes: 'Agosto',
      año: 2025,
      totalUsuarias: 18,
      fechaRegistro: '15 Ago 2025',
      fechaSync: '15 Ago 2025 16:45',
      estado: 'sincronizado',
      editable: false,
      detalle: {
        inyecciones: 10,
        orales: 6,
        dispositivos: 1,
        barrera: 1,
        naturales: 0,
        definitivos: 0
      }
    },
    {
      id: 3,
      mes: 'Julio',
      año: 2025,
      totalUsuarias: 15,
      fechaRegistro: '12 Jul 2025',
      fechaSync: null,
      estado: 'pendiente',
      editable: false,
      detalle: {
        inyecciones: 8,
        orales: 5,
        dispositivos: 1,
        barrera: 1,
        naturales: 0,
        definitivos: 0
      }
    },
    {
      id: 4,
      mes: 'Junio',
      año: 2025,
      totalUsuarias: 22,
      fechaRegistro: '14 Jun 2025',
      fechaSync: '14 Jun 2025 09:20',
      estado: 'sincronizado',
      editable: false,
      detalle: {
        inyecciones: 11,
        orales: 7,
        dispositivos: 2,
        barrera: 2,
        naturales: 0,
        definitivos: 0
      }
    }
  ];

  const getEstadoBadge = (estado: string) => {
    const styles = {
      'sincronizado': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Sincronizado' },
      'pendiente': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pendiente' },
      'error': { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle, label: 'Error' }
    };
    return styles[estado as keyof typeof styles] || styles.pendiente;
  };

  const getTotalAcumulado = () => {
    return historialRegistros.reduce((total, registro) => total + registro.totalUsuarias, 0);
  };

  const getPromedioMensual = () => {
    const registrosSincronizados = historialRegistros.filter(r => r.estado === 'sincronizado');
    if (registrosSincronizados.length === 0) return 0;
    return Math.round(registrosSincronizados.reduce((total, registro) => total + registro.totalUsuarias, 0) / registrosSincronizados.length);
  };

  if (selectedRegistro) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRegistro(null)}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Detalle del Registro</h1>
              <p className="text-white/80 text-sm">{selectedRegistro.mes} {selectedRegistro.año}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Información General */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg">Información del Registro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Período</p>
                  <p className="font-medium">{selectedRegistro.mes} {selectedRegistro.año}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Usuarias</p>
                  <p className="font-semibold text-lg text-[#6366F1]">{selectedRegistro.totalUsuarias}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fecha de Registro</p>
                  <p className="font-medium">{selectedRegistro.fechaRegistro}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Estado</p>
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const badge = getEstadoBadge(selectedRegistro.estado);
                      const IconComponent = badge.icon;
                      return (
                        <>
                          <IconComponent className="w-4 h-4 text-gray-500" />
                          <Badge className={`${badge.bg} ${badge.text}`}>
                            {badge.label}
                          </Badge>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
              {selectedRegistro.fechaSync && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    Sincronizado: {selectedRegistro.fechaSync}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detalle por Métodos */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg">Detalle por Métodos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(selectedRegistro.detalle).map(([metodo, cantidad]) => (
                  <div key={metodo} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm capitalize">{metodo.replace('_', ' ')}</span>
                    <span className="font-semibold">{cantidad}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          {selectedRegistro.editable && (
            <div className="space-y-3">
              <Button 
                onClick={() => navigateToScreen('registro-datos')}
                className="w-full h-12 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] hover:from-[#5B5BD6] hover:to-[#2563EB] text-white"
              >
                <Edit className="w-5 h-5 mr-2" />
                Editar Registro Actual
              </Button>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation 
          userType="auxiliar"
          currentScreen="historial-personal"
          onNavigate={navigateToScreen}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen('dashboard-auxiliar')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Mi Historial</h1>
            <p className="text-white/80 text-sm">{user?.name} - {user?.community}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <p className="text-white/80 text-xs">Total Acumulado</p>
            <p className="font-semibold text-lg">{getTotalAcumulado()}</p>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-xs">Promedio Mensual</p>
            <p className="font-semibold text-lg">{getPromedioMensual()}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Registros por Mes</h3>
          <Badge variant="secondary" className="bg-[#6366F1]/10 text-[#6366F1]">
            {historialRegistros.length} registros
          </Badge>
        </div>

        {historialRegistros.map((registro) => {
          const estadoBadge = getEstadoBadge(registro.estado);
          const IconComponent = estadoBadge.icon;
          
          return (
            <Card key={registro.id} className="bg-white shadow-sm border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#6366F1]/10 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#6366F1]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{registro.mes} {registro.año}</h3>
                      <p className="text-xs text-gray-500">{registro.fechaRegistro}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${estadoBadge.bg} ${estadoBadge.text} text-xs`}>
                      {estadoBadge.label}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRegistro(registro)}
                      className="text-[#6366F1]"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {registro.totalUsuarias} usuarias registradas
                    </span>
                  </div>
                  
                  {registro.editable && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigateToScreen('registro-datos')}
                      className="text-xs"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                  )}
                </div>

                {registro.fechaSync && (
                  <div className="mt-2 text-xs text-gray-500 flex items-center space-x-1">
                    <IconComponent className="w-3 h-3" />
                    <span>Sincronizado: {registro.fechaSync}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        userType="auxiliar"
        currentScreen="historial-personal"
        onNavigate={navigateToScreen}
      />
    </div>
  );
}