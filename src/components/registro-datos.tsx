import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, Screen } from '../App';
import { BottomNavigation } from './bottom-navigation';
import { 
  ArrowLeft,
  Save,
  Calendar,
  Syringe,
  Pill,
  Shield,
  Heart,
  Activity,
  Plus,
  Minus
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RegistroDatosProps {
  user: User | null;
  navigateToScreen: (screen: Screen) => void;
  logout: () => void;
}

interface MetodoAnticonceptivo {
  id: string;
  nombre: string;
  categoria: string;
  icon: React.ElementType;
  cantidad: number;
}

export function RegistroDatos({ user, navigateToScreen, logout }: RegistroDatosProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

  const [metodos, setMetodos] = useState<MetodoAnticonceptivo[]>([
    // Inyecciones
    { id: 'iny_mensual', nombre: 'Inyección Mensual', categoria: 'Inyecciones', icon: Syringe, cantidad: 0 },
    { id: 'iny_bimensual', nombre: 'Inyección Bimensual', categoria: 'Inyecciones', icon: Syringe, cantidad: 0 },
    { id: 'iny_trimestral', nombre: 'Inyección Trimestral', categoria: 'Inyecciones', icon: Syringe, cantidad: 0 },
    
    // Métodos Orales
    { id: 'pildoras', nombre: 'Píldoras', categoria: 'Métodos Orales', icon: Pill, cantidad: 0 },
    { id: 'pildora_emergencia', nombre: 'Píldora de Emergencia', categoria: 'Métodos Orales', icon: Pill, cantidad: 0 },
    
    // Dispositivos
    { id: 'diu', nombre: 'DIU', categoria: 'Dispositivos', icon: Activity, cantidad: 0 },
    { id: 'implante', nombre: 'Implante', categoria: 'Dispositivos', icon: Activity, cantidad: 0 },
    
    // Métodos de Barrera
    { id: 'condon_m', nombre: 'Condón Masculino', categoria: 'Métodos de Barrera', icon: Shield, cantidad: 0 },
    { id: 'condon_f', nombre: 'Condón Femenino', categoria: 'Métodos de Barrera', icon: Shield, cantidad: 0 },
    
    // Métodos Naturales
    { id: 'mela', nombre: 'MELA', categoria: 'Métodos Naturales', icon: Heart, cantidad: 0 },
    { id: 'collar_ciclo', nombre: 'Collar del Ciclo', categoria: 'Métodos Naturales', icon: Heart, cantidad: 0 },
    
    // Métodos Definitivos
    { id: 'aqv_femenina', nombre: 'AQV Femenina', categoria: 'Métodos Definitivos', icon: Activity, cantidad: 0 },
    { id: 'aqv_masculina', nombre: 'AQV Masculina', categoria: 'Métodos Definitivos', icon: Activity, cantidad: 0 }
  ]);

  const updateCantidad = (id: string, increment: boolean) => {
    setMetodos(prev => prev.map(metodo => 
      metodo.id === id 
        ? { ...metodo, cantidad: Math.max(0, metodo.cantidad + (increment ? 1 : -1)) }
        : metodo
    ));
  };

  const getTotalUsuarias = () => {
    return metodos.reduce((total, metodo) => total + metodo.cantidad, 0);
  };

  const getMetodosPorCategoria = () => {
    const categorias = [...new Set(metodos.map(m => m.categoria))];
    return categorias.map(categoria => ({
      categoria,
      metodos: metodos.filter(m => m.categoria === categoria)
    }));
  };

  const handleSaveRegistro = () => {
    const totalUsuarias = getTotalUsuarias();
    if (totalUsuarias === 0) {
      toast.error('Debes registrar al menos una usuaria');
      return;
    }

    // Simular guardado
    toast.success(`Registro guardado: ${totalUsuarias} usuarias registradas`);
    setTimeout(() => {
      navigateToScreen('dashboard-auxiliar');
    }, 1500);
  };

  const getCategoriaColor = (categoria: string) => {
    const colors: { [key: string]: string } = {
      'Inyecciones': 'bg-blue-50 text-blue-700',
      'Métodos Orales': 'bg-green-50 text-green-700',
      'Dispositivos': 'bg-purple-50 text-purple-700',
      'Métodos de Barrera': 'bg-orange-50 text-orange-700',
      'Métodos Naturales': 'bg-pink-50 text-pink-700',
      'Métodos Definitivos': 'bg-red-50 text-red-700'
    };
    return colors[categoria] || 'bg-gray-50 text-gray-700';
  };

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
            <h1 className="text-lg font-semibold">Registro de Datos</h1>
            <p className="text-white/80 text-sm">{user?.name} - {user?.community}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{currentMonth}</span>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            Total: {getTotalUsuarias()} usuarias
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {getMetodosPorCategoria().map(({ categoria, metodos: metodosCategoria }) => (
          <div key={categoria}>
            <div className="flex items-center space-x-2 mb-3">
              <Badge className={getCategoriaColor(categoria)}>
                {categoria}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {metodosCategoria.map((metodo) => {
                const IconComponent = metodo.icon;
                return (
                  <Card key={metodo.id} className="bg-white shadow-sm border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{metodo.nombre}</p>
                            <p className="text-xs text-gray-500">Usuarias atendidas</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCantidad(metodo.id, false)}
                            disabled={metodo.cantidad === 0}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          
                          <div className="w-12 h-8 bg-[#F9FAFB] rounded-lg flex items-center justify-center">
                            <span className="font-semibold text-sm">{metodo.cantidad}</span>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCantidad(metodo.id, true)}
                            className="w-8 h-8 p-0 rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {/* Resumen del Registro */}
        <Card className="bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10 border-[#6366F1]/20">
          <CardHeader>
            <CardTitle className="text-[#6366F1] text-lg">Resumen del Registro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total de usuarias:</span>
                <span className="font-semibold">{getTotalUsuarias()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Métodos activos:</span>
                <span className="font-semibold">
                  {metodos.filter(m => m.cantidad > 0).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Mes de registro:</span>
                <span className="font-semibold">{currentMonth}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botón Guardar */}
        <Button 
          onClick={handleSaveRegistro}
          className="w-full h-12 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] hover:from-[#5B5BD6] hover:to-[#2563EB] text-white"
          disabled={getTotalUsuarias() === 0}
        >
          <Save className="w-5 h-5 mr-2" />
          Guardar Registro
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        userType="auxiliar"
        currentScreen="registro-datos"
        onNavigate={navigateToScreen}
      />
    </div>
  );
}