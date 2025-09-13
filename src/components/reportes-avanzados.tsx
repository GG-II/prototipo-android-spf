import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User, Screen } from '../App';
import { BottomNavigation } from './bottom-navigation';
import { 
  ArrowLeft,
  Download,
  FileText,
  BarChart3,
  Calendar,
  MapPin,
  Filter
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ReportesAvanzadosProps {
  user: User | null;
  navigateToScreen: (screen: Screen) => void;
  logout: () => void;
}

export function ReportesAvanzados({ user, navigateToScreen, logout }: ReportesAvanzadosProps) {
  const [periodo, setPeriodo] = useState('mensual');
  const [comunidades, setComunidades] = useState('todas');
  const [metodos, setMetodos] = useState('todos');
  const [tipoReporte, setTipoReporte] = useState('resumen');

  const templates = [
    { id: 'sigsa3', nombre: 'Reporte SIGSA 3', descripcion: 'Formato oficial MSPAS' },
    { id: 'mensual', nombre: 'Informe Mensual', descripcion: 'Resumen mensual ejecutivo' },
    { id: 'trimestral', nombre: 'Análisis Trimestral', descripcion: 'Análisis comparativo' }
  ];

  const reportesRecientes = [
    { nombre: 'Informe Sep 2025', fecha: '13 Sep 2025', tipo: 'PDF' },
    { nombre: 'SIGSA Agosto', fecha: '31 Ago 2025', tipo: 'Excel' },
    { nombre: 'Trimestral Q3', fecha: '30 Sep 2025', tipo: 'PDF' }
  ];

  const handleGenerateReport = () => {
    toast.success('Generando reporte...');
    setTimeout(() => {
      toast.success('Reporte generado exitosamente');
    }, 2000);
  };

  const handleExport = (format: string) => {
    toast.success(`Exportando en formato ${format}...`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen('dashboard-encargado')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Reportes Avanzados</h1>
            <p className="text-white/80 text-sm">Generador de reportes</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Configuración de Reporte */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Configuración del Reporte</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Período</label>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensual">Mensual</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Comunidades</label>
              <Select value={comunidades} onValueChange={setComunidades}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las comunidades</SelectItem>
                  <SelectItem value="san-pedro">San Pedro Necta</SelectItem>
                  <SelectItem value="todos-santos">Todos Santos</SelectItem>
                  <SelectItem value="santa-barbara">Santa Bárbara</SelectItem>
                  <SelectItem value="la-democracia">La Democracia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Métodos</label>
              <Select value={metodos} onValueChange={setMetodos}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los métodos</SelectItem>
                  <SelectItem value="inyecciones">Solo inyecciones</SelectItem>
                  <SelectItem value="orales">Métodos orales</SelectItem>
                  <SelectItem value="dispositivos">Dispositivos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Tipo de Reporte</label>
              <Select value={tipoReporte} onValueChange={setTipoReporte}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resumen">Resumen ejecutivo</SelectItem>
                  <SelectItem value="detallado">Detallado</SelectItem>
                  <SelectItem value="comparativo">Comparativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Vista Previa</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-sm">Vista previa del reporte aparecerá aquí</p>
            </div>
          </CardContent>
        </Card>

        {/* Generar y Exportar */}
        <div className="space-y-3">
          <Button 
            onClick={handleGenerateReport}
            className="w-full h-12 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] hover:from-[#5B5BD6] hover:to-[#2563EB] text-white"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Generar Reporte
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline"
              onClick={() => handleExport('PDF')}
              className="border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleExport('Excel')}
              className="border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Excel
            </Button>
          </div>
        </div>

        {/* Templates Predefinidos */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg">Templates Predefinidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {templates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{template.nombre}</p>
                    <p className="text-xs text-gray-500">{template.descripcion}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Usar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reportes Recientes */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-lg">Reportes Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportesRecientes.map((reporte, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">{reporte.nombre}</p>
                      <p className="text-xs text-gray-500">{reporte.fecha}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {reporte.tipo}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        userType="encargado"
        currentScreen="reportes-avanzados"
        onNavigate={navigateToScreen}
      />
    </div>
  );
}