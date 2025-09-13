import React, { useState } from 'react';
import { LoginScreen } from './components/login-screen';
import { DashboardAuxiliar } from './components/dashboard-auxiliar';
import { RegistroDatos } from './components/registro-datos';
import { DashboardAsistente } from './components/dashboard-asistente';
import { PantallaValidacion } from './components/pantalla-validacion';
import { DashboardEncargado } from './components/dashboard-encargado';
import { ReportesAvanzados } from './components/reportes-avanzados';
import { DashboardCoordinador } from './components/dashboard-coordinador';
import { ConfiguracionMetas } from './components/configuracion-metas';
import { HistorialPersonal } from './components/historial-personal';
import { Toaster } from './components/ui/sonner';

export type UserType = 'auxiliar' | 'asistente' | 'encargado' | 'coordinador';

export type Screen = 
  | 'login'
  | 'dashboard-auxiliar'
  | 'registro-datos'
  | 'dashboard-asistente'
  | 'pantalla-validacion'
  | 'dashboard-encargado'
  | 'reportes-avanzados'
  | 'dashboard-coordinador'
  | 'configuracion-metas'
  | 'historial-personal';

export interface User {
  id: string;
  name: string;
  type: UserType;
  community?: string;
  territory?: string;
}

export interface AppState {
  currentScreen: Screen;
  user: User | null;
  isAuthenticated: boolean;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'login',
    user: null,
    isAuthenticated: false
  });

  const navigateToScreen = (screen: Screen) => {
    setAppState(prev => ({ ...prev, currentScreen: screen }));
  };

  const loginUser = (user: User) => {
    setAppState({
      currentScreen: getDashboardForUserType(user.type),
      user,
      isAuthenticated: true
    });
  };

  const logout = () => {
    setAppState({
      currentScreen: 'login',
      user: null,
      isAuthenticated: false
    });
  };

  const getDashboardForUserType = (userType: UserType): Screen => {
    switch (userType) {
      case 'auxiliar':
        return 'dashboard-auxiliar';
      case 'asistente':
        return 'dashboard-asistente';
      case 'encargado':
        return 'dashboard-encargado';
      case 'coordinador':
        return 'dashboard-coordinador';
      default:
        return 'dashboard-auxiliar';
    }
  };

  const renderCurrentScreen = () => {
    const commonProps = {
      user: appState.user,
      navigateToScreen,
      logout
    };

    switch (appState.currentScreen) {
      case 'login':
        return <LoginScreen onLogin={loginUser} />;
      case 'dashboard-auxiliar':
        return <DashboardAuxiliar {...commonProps} />;
      case 'registro-datos':
        return <RegistroDatos {...commonProps} />;
      case 'dashboard-asistente':
        return <DashboardAsistente {...commonProps} />;
      case 'pantalla-validacion':
        return <PantallaValidacion {...commonProps} />;
      case 'dashboard-encargado':
        return <DashboardEncargado {...commonProps} />;
      case 'reportes-avanzados':
        return <ReportesAvanzados {...commonProps} />;
      case 'dashboard-coordinador':
        return <DashboardCoordinador {...commonProps} />;
      case 'configuracion-metas':
        return <ConfiguracionMetas {...commonProps} />;
      case 'historial-personal':
        return <HistorialPersonal {...commonProps} />;
      default:
        return <LoginScreen onLogin={loginUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
        {renderCurrentScreen()}
        <Toaster />
      </div>
    </div>
  );
}