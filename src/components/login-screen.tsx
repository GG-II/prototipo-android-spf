import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Heart, Wifi, WifiOff } from 'lucide-react';
import { User, UserType } from '../App';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  const demoCredentials = [
    { email: 'coordinadora@mspas.gob.gt', password: 'coord123', type: 'coordinador' as UserType, name: 'María González', community: 'Huehuetenango' },
    { email: 'auxiliar@mspas.gob.gt', password: 'aux123', type: 'auxiliar' as UserType, name: 'Ana López', community: 'San Pedro Necta' },
    { email: 'encargado@mspas.gob.gt', password: 'enc123', type: 'encargado' as UserType, name: 'Carlos Mendoza', community: 'Centro Norte' },
    { email: 'asistente@mspas.gob.gt', password: 'asis123', type: 'asistente' as UserType, name: 'Luis Morales', territory: 'Norte' }
  ];

  const handleLogin = () => {
    const credential = demoCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (credential) {
      onLogin({
        id: `user_${credential.type}`,
        name: credential.name,
        type: credential.type,
        community: credential.community,
        territory: credential.territory
      });
    }
  };

  const fillCredentials = (credential: typeof demoCredentials[0]) => {
    setEmail(credential.email);
    setPassword(credential.password);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#8B5CF6] to-[#60A5FA]">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo MSPAS */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
            <Heart className="w-10 h-10 text-[#6366F1]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">SGPF - MSPAS</h1>
          <p className="text-white/80 text-sm mb-1">Sistema de Gestión de Planificación Familiar</p>
          <p className="text-white/70 text-xs">Centro de Salud Norte - Huehuetenango</p>
        </div>

        {/* Login Form */}
        <Card className="w-full max-w-sm shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <h2 className="text-center text-lg font-semibold text-gray-800">Iniciar Sesión</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email / DPI</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
            <Button 
              onClick={handleLogin}
              className="w-full h-12 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] hover:from-[#5B5BD6] hover:to-[#2563EB] text-white"
            >
              Iniciar Sesión
            </Button>
            <div className="text-center">
              <button className="text-sm text-[#6366F1] hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="w-full max-w-sm mt-4 bg-white/95">
          <CardHeader className="pb-2">
            <h3 className="text-sm font-semibold text-gray-700">Credenciales de Prueba</h3>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoCredentials.map((cred, index) => (
              <button
                key={index}
                onClick={() => fillCredentials(cred)}
                className="w-full text-left p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-xs font-medium text-gray-700 capitalize">{cred.type}</div>
                <div className="text-xs text-gray-500">{cred.email}</div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="p-4 flex items-center justify-center text-white/70">
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <Wifi className="w-4 h-4" />
          ) : (
            <WifiOff className="w-4 h-4" />
          )}
          <span className="text-xs">
            {isConnected ? 'Conectado' : 'Sin conexión'}
          </span>
        </div>
      </div>
    </div>
  );
}