import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { User, Screen } from '../App';
import { BottomNavigation } from './bottom-navigation';
import { 
  ArrowLeft,
  Save,
  Target,
  MapPin,
  Settings,
  History
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ConfiguracionMetasProps {
  user: User | null;
  navigateToScreen: (screen: Screen) => void;
  logout: () => void;
}

export function ConfiguracionMetas({ user, navigateToScreen, logout }: ConfiguracionMetasProps) {
  const [metasPorMetodo, setMetasPorMetodo] = useState({
    inyecciones: 850,
    orales: 420,
    dispositivos: 320,
    barrera: 180,
    naturales: 90,
    definitivos: 240
  });

  const [metasPorComunidad, setMetasPorComunidad] = useState({
    'San Pedro Necta': { poblacionMEF: 1200, meta: 350 },
    'Todos Santos': { poblacionMEF: 980, meta: 280 },
    'Santa Bárbara': { poblacionMEF: 750, meta: 220 },
    'La Democracia': { poblacionMEF: 650, meta: 190 }
  });

  const [configuracionGeneral, setConfiguracionGeneral] = useState({
    alertasCumplimiento: true,
    notificacionesSync: true,
    umbralCritico: 50,
    umbralAlerta: 75
  });

  const cambiosRecientes = [
    { fecha: '01 Sep 2025', cambio: 'Meta anual actualizada a 2,100', usuario: 'Admin' },
    { fecha: '15 Ago 2025', cambio: 'Umbral crítico cambiado a 50%', usuario: 'Coordinador' },
    { fecha: '30 Jul 2025', cambio: 'Nueva comunidad agregada: Santiago', usuario: 'Encargado' }
  ];

  const updateMetaPorMetodo = (metodo: string, valor: number) => {
    setMetasPorMetodo(prev => ({ ...prev, [metodo]: valor }));
  };

  const updateMetaPorComunidad = (comunidad: string, campo: 'poblacionMEF' | 'meta', valor: number) => {
    setMetasPorComunidad(prev => ({
      ...prev,
      [comunidad]: { ...prev[comunidad], [campo]: valor }
    }));
  };

  const handleSaveConfiguration = () => {
    toast.success('Configuración guardada exitosamente');
  };

  const getReturnScreen = () => {
    if (user?.type === 'coordinador') return 'dashboard-coordinador';
    return 'dashboard-encargado';
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen(getReturnScreen())}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Configuración de Metas</h1>
            <p className="text-white/80 text-sm">Gestión de objetivos y alertas</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Tabs defaultValue="metodos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="metodos">Por Método</TabsTrigger>
            <TabsTrigger value="comunidades">Por Comunidad</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          {/* Por Método */}
          <TabsContent value="metodos" className="space-y-4">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Metas por Método Anticonceptivo</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(metasPorMetodo).map(([metodo, meta]) => (
                  <div key={metodo} className="flex items-center justify-between">
                    <Label className="capitalize">{metodo.replace('_', ' ')}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={meta}
                        onChange={(e) => updateMetaPorMetodo(metodo, parseInt(e.target.value) || 0)}
                        className="w-24 h-8"
                      />
                      <span className="text-sm text-gray-500">usuarias/año</span>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Meta Anual:</span>
                    <span className="text-[#6366F1]">
                      {Object.values(metasPorMetodo).reduce((a, b) => a + b, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Por Comunidad */}
          <TabsContent value="comunidades" className="space-y-4">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Metas por Comunidad</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(metasPorComunidad).map(([comunidad, datos]) => (
                  <div key={comunidad} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">{comunidad}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Población MEF</Label>
                        <Input
                          type="number"
                          value={datos.poblacionMEF}
                          onChange={(e) => updateMetaPorComunidad(comunidad, 'poblacionMEF', parseInt(e.target.value) || 0)}
                          className="h-8 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Meta Anual</Label>
                        <Input
                          type="number"
                          value={datos.meta}
                          onChange={(e) => updateMetaPorComunidad(comunidad, 'meta', parseInt(e.target.value) || 0)}
                          className="h-8 mt-1"
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Cobertura objetivo: {((datos.meta / datos.poblacionMEF) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* General */}
          <TabsContent value="general" className="space-y-4">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Configuración General</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Alertas de Cumplimiento</Label>
                      <p className="text-xs text-gray-500">Notificar cuando se incumplan metas</p>
                    </div>
                    <Switch
                      checked={configuracionGeneral.alertasCumplimiento}
                      onCheckedChange={(checked) => 
                        setConfiguracionGeneral(prev => ({ ...prev, alertasCumplimiento: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificaciones de Sincronización</Label>
                      <p className="text-xs text-gray-500">Alertar sobre datos pendientes</p>
                    </div>
                    <Switch
                      checked={configuracionGeneral.notificacionesSync}
                      onCheckedChange={(checked) => 
                        setConfiguracionGeneral(prev => ({ ...prev, notificacionesSync: checked }))
                      }
                    />
                  </div>

                  <div>
                    <Label>Umbral Crítico (%)</Label>
                    <Input
                      type="number"
                      value={configuracionGeneral.umbralCritico}
                      onChange={(e) => 
                        setConfiguracionGeneral(prev => ({ ...prev, umbralCritico: parseInt(e.target.value) || 0 }))
                      }
                      className="h-8 mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Porcentaje mínimo antes de alerta crítica
                    </p>
                  </div>

                  <div>
                    <Label>Umbral de Alerta (%)</Label>
                    <Input
                      type="number"
                      value={configuracionGeneral.umbralAlerta}
                      onChange={(e) => 
                        setConfiguracionGeneral(prev => ({ ...prev, umbralAlerta: parseInt(e.target.value) || 0 }))
                      }
                      className="h-8 mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Porcentaje para generar alerta preventiva
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historial de Cambios */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Historial de Cambios</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cambiosRecientes.map((cambio, index) => (
                    <div key={index} className="border-l-4 border-l-blue-500 bg-blue-50 p-3 rounded-r-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium">{cambio.cambio}</p>
                          <p className="text-xs text-gray-500">por {cambio.usuario}</p>
                        </div>
                        <span className="text-xs text-gray-400">{cambio.fecha}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botón Guardar */}
        <Button 
          onClick={handleSaveConfiguration}
          className="w-full h-12 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] hover:from-[#5B5BD6] hover:to-[#2563EB] text-white mt-6"
        >
          <Save className="w-5 h-5 mr-2" />
          Guardar Configuración
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        userType={user?.type || 'encargado'}
        currentScreen="configuracion-metas"
        onNavigate={navigateToScreen}
      />
    </div>
  );
}