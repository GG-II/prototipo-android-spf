import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { User, Screen } from '../App';
import { BottomNavigation } from './bottom-navigation';
import { 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PantallaValidacionProps {
  user: User | null;
  navigateToScreen: (screen: Screen) => void;
  logout: () => void;
}

interface RegistroValidacion {
  id: number;
  auxiliar: string;
  comunidad: string;
  fecha: string;
  usuarias: number;
  metodos: number;
  estado: 'pendiente' | 'revision' | 'aprobado' | 'rechazado';
  detalle: {
    inyecciones: number;
    orales: number;
    dispositivos: number;
    barrera: number;
    naturales: number;
    definitivos: number;
  };
  comentarios?: string;
}

export function PantallaValidacion({ user, navigateToScreen, logout }: PantallaValidacionProps) {
  const [selectedRegistro, setSelectedRegistro] = useState<RegistroValidacion | null>(null);
  const [comentarios, setComentarios] = useState('');
  const [registros, setRegistros] = useState<RegistroValidacion[]>([
    {
      id: 1,
      auxiliar: 'Ana López',
      comunidad: 'San Pedro Necta',
      fecha: '13 Sep 2025',
      usuarias: 7,
      metodos: 2,
      estado: 'pendiente',
      detalle: {
        inyecciones: 4,
        orales: 2,
        dispositivos: 1,
        barrera: 0,
        naturales: 0,
        definitivos: 0
      }
    },
    {
      id: 2,
      auxiliar: 'María Morales',
      comunidad: 'La Democracia',
      fecha: '12 Sep 2025',
      usuarias: 3,
      metodos: 1,
      estado: 'pendiente',
      detalle: {
        inyecciones: 2,
        orales: 1,
        dispositivos: 0,
        barrera: 0,
        naturales: 0,
        definitivos: 0
      }
    },
    {
      id: 3,
      auxiliar: 'Carmen Pérez',
      comunidad: 'Santa Bárbara',
      fecha: '11 Sep 2025',
      usuarias: 5,
      metodos: 3,
      estado: 'revision',
      detalle: {
        inyecciones: 2,
        orales: 1,
        dispositivos: 1,
        barrera: 1,
        naturales: 0,
        definitivos: 0
      },
      comentarios: 'Revisar totales de dispositivos'
    }
  ]);

  const getEstadoBadge = (estado: string) => {
    const styles = {
      'pendiente': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendiente' },
      'revision': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'En Revisión' },
      'aprobado': { bg: 'bg-green-100', text: 'text-green-800', label: 'Aprobado' },
      'rechazado': { bg: 'bg-red-100', text: 'text-red-800', label: 'Rechazado' }
    };
    return styles[estado as keyof typeof styles] || styles.pendiente;
  };

  const updateEstadoRegistro = (id: number, nuevoEstado: RegistroValidacion['estado']) => {
    setRegistros(prev => prev.map(registro => 
      registro.id === id 
        ? { ...registro, estado: nuevoEstado, comentarios }
        : registro
    ));
    
    const accion = nuevoEstado === 'aprobado' ? 'aprobado' : 
                   nuevoEstado === 'rechazado' ? 'rechazado' : 'marcado para revisión';
    
    toast.success(`Registro ${accion} correctamente`);
    setSelectedRegistro(null);
    setComentarios('');
  };

  const getComunidadColor = (comunidad: string) => {
    const colors: { [key: string]: string } = {
      'San Pedro Necta': 'border-l-blue-500',
      'La Democracia': 'border-l-green-500',
      'Santa Bárbara': 'border-l-purple-500',
      'Santiago Chimaltenango': 'border-l-orange-500',
      'Todos Santos': 'border-l-red-500'
    };
    return colors[comunidad] || 'border-l-gray-500';
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
              <h1 className="text-lg font-semibold">Validar Registro</h1>
              <p className="text-white/80 text-sm">{selectedRegistro.auxiliar} - {selectedRegistro.comunidad}</p>
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
                  <p className="text-xs text-gray-500">Auxiliar</p>
                  <p className="font-medium">{selectedRegistro.auxiliar}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Comunidad</p>
                  <p className="font-medium">{selectedRegistro.comunidad}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fecha</p>
                  <p className="font-medium">{selectedRegistro.fecha}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Usuarias</p>
                  <p className="font-semibold text-lg text-[#6366F1]">{selectedRegistro.usuarias}</p>
                </div>
              </div>
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

          {/* Comentarios */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg">Comentarios/Observaciones</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRegistro.comentarios && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">Comentarios anteriores:</p>
                  <p className="text-sm text-blue-700">{selectedRegistro.comentarios}</p>
                </div>
              )}
              <Textarea
                placeholder="Escribe tus observaciones sobre este registro..."
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Acciones */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              onClick={() => updateEstadoRegistro(selectedRegistro.id, 'aprobado')}
              className="bg-[#10B981] hover:bg-[#059669] text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprobar
            </Button>
            <Button
              onClick={() => updateEstadoRegistro(selectedRegistro.id, 'revision')}
              variant="outline"
              className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Revisar
            </Button>
            <Button
              onClick={() => updateEstadoRegistro(selectedRegistro.id, 'rechazado')}
              variant="destructive"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Rechazar
            </Button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation 
          userType="asistente"
          currentScreen="pantalla-validacion"
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
            onClick={() => navigateToScreen('dashboard-asistente')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Validación de Registros</h1>
            <p className="text-white/80 text-sm">Territorio {user?.territory}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Registros pendientes</span>
          <Badge variant="secondary" className="bg-white/20 text-white">
            {registros.filter(r => r.estado === 'pendiente').length} pendientes
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {registros.map((registro) => {
          const estadoBadge = getEstadoBadge(registro.estado);
          
          return (
            <Card key={registro.id} className={`bg-white shadow-sm border-l-4 ${getComunidadColor(registro.comunidad)}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-sm">{registro.auxiliar}</h3>
                    <Badge className={`${estadoBadge.bg} ${estadoBadge.text} text-xs`}>
                      {estadoBadge.label}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedRegistro(registro)}
                    className="text-[#6366F1]"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">{registro.comunidad}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {registro.usuarias} usuarias, {registro.metodos} métodos
                    </span>
                    <span className="text-gray-500">{registro.fecha}</span>
                  </div>
                  
                  {registro.comentarios && (
                    <div className="flex items-center space-x-2 mt-2">
                      <MessageSquare className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">Tiene comentarios</p>
                    </div>
                  )}
                </div>

                {registro.estado === 'pendiente' && (
                  <div className="flex space-x-2 mt-3">
                    <Button
                      size="sm"
                      onClick={() => updateEstadoRegistro(registro.id, 'aprobado')}
                      className="bg-[#10B981] hover:bg-[#059669] text-white text-xs"
                    >
                      Aprobar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateEstadoRegistro(registro.id, 'revision')}
                      className="text-xs"
                    >
                      Revisar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateEstadoRegistro(registro.id, 'rechazado')}
                      className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white text-xs"
                    >
                      Rechazar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        userType="asistente"
        currentScreen="pantalla-validacion"
        onNavigate={navigateToScreen}
      />
    </div>
  );
}