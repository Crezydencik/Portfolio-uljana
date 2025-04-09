
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import MongoDBService from '@/services/mongodb';
import { useProjectStore } from '@/hooks/useProjectStore';
import { Database, Server, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MongoDBConfig = () => {
  const { toast } = useToast();
  const { useMongoDBBackend, setUseMongoDBBackend } = useProjectStore();
  const mongoService = MongoDBService.getInstance();
  
  const [connectionString, setConnectionString] = useState(mongoService.connectionString || 'mongodb+srv://admin:Port.ulj25@ulyanavalyn.jwj9sbo.mongodb.net/?retryWrites=true&w=majority&appName=UlyanaValyn');
  const [database, setDatabase] = useState(mongoService.database || 'ulyanavalyn');
  const [collection, setCollection] = useState(mongoService.collection || 'projects');
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Автоматически заполнять поля из .env при первой загрузке
  useEffect(() => {
    // Проверяем, загружены ли уже данные
    if (!mongoService.connectionString) {
      setConnectionString('mongodb+srv://admin:Port.ulj25@ulyanavalyn.jwj9sbo.mongodb.net/?retryWrites=true&w=majority&appName=UlyanaValyn');
      setDatabase('ulyanavalyn');
      setCollection('projects');
    }
  }, []);
  
  const handleConnect = async () => {
    setIsConnecting(true);
    setErrorMessage(null);
    
    try {
      // Простая проверка URI
      if (!connectionString.startsWith('mongodb')) {
        throw new Error('Неверный формат строки подключения MongoDB');
      }
      
      const success = await mongoService.connect(connectionString, database, collection);
      
      if (success) {
        toast({
          title: 'Подключено к MongoDB',
          description: `База данных: ${database}, Коллекция: ${collection}`,
        });
        setUseMongoDBBackend(true);
      } else {
        toast({
          title: 'Ошибка подключения',
          description: 'Не удалось подключиться к MongoDB. Проверьте учетные данные.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка при подключении к MongoDB';
      setErrorMessage(message);
      toast({
        title: 'Ошибка',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleTestApiEndpoint = async () => {
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      toast({
        title: 'API Test',
        description: `Ответ: ${JSON.stringify(data)}`,
      });
    } catch (error) {
      toast({
        title: 'API Test Failed',
        description: error instanceof Error ? error.message : 'Ошибка проверки API',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Настройка MongoDB
        </CardTitle>
        <CardDescription>
          Настройте подключение к MongoDB для сохранения и загрузки проектов
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}
      
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              checked={useMongoDBBackend}
              onCheckedChange={setUseMongoDBBackend}
              id="mongodb-toggle"
            />
            <Label htmlFor="mongodb-toggle">Использовать MongoDB Backend</Label>
          </div>
          <div className="text-sm text-muted-foreground">
            {useMongoDBBackend ? 'Проекты будут сохранены в MongoDB' : 'Проекты будут сохранены локально'}
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="connection-string">Строка подключения</Label>
            <Input
              id="connection-string"
              value={connectionString}
              onChange={(e) => setConnectionString(e.target.value)}
              placeholder="mongodb+srv://username:password@cluster.mongodb.net"
            />
          </div>
          
          <div>
            <Label htmlFor="database">Имя базы данных</Label>
            <Input
              id="database"
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              placeholder="portfolio"
            />
          </div>
          
          <div>
            <Label htmlFor="collection">Имя коллекции</Label>
            <Input
              id="collection"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              placeholder="projects"
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          onClick={handleConnect} 
          disabled={isConnecting || !connectionString || !database || !collection}
          className="w-full"
        >
          <Server className="h-4 w-4 mr-2" />
          {isConnecting ? 'Подключение...' : 'Подключиться к MongoDB'}
        </Button>
        
        <Button
          onClick={handleTestApiEndpoint}
          variant="outline"
          className="w-full"
        >
          Проверить API
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MongoDBConfig;
