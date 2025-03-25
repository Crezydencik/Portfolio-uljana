
import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import MongoDBService from '@/services/mongodb';
import { useProjectStore } from '@/hooks/useProjectStore';
import { Database, Server } from 'lucide-react';

const MongoDBConfig = () => {
  const { t } = useTranslation();
  const [connectionString, setConnectionString] = useState('mongodb://localhost:27017');
  const [dbName, setDbName] = useState('portfolio');
  const [collection, setCollection] = useState('projects');
  const [isConnected, setIsConnected] = useState(false);
  const { useMongoDBBackend, setUseMongoDBBackend } = useProjectStore();
  
  useEffect(() => {
    // Check if already connected
    const mongoService = MongoDBService.getInstance();
    setIsConnected(mongoService.isConnectedToMongo());
    
    if (mongoService.isConnectedToMongo() && mongoService.getConfig()) {
      const config = mongoService.getConfig();
      if (config) {
        setConnectionString(config.connectionString);
        setDbName(config.dbName);
        if (config.collection) {
          setCollection(config.collection);
        }
      }
    }
  }, []);
  
  const handleConnect = async () => {
    const mongoService = MongoDBService.getInstance();
    const success = await mongoService.connect(connectionString, dbName, collection);
    setIsConnected(success);
  };
  
  const handleDisconnect = () => {
    const mongoService = MongoDBService.getInstance();
    mongoService.disconnect();
    setIsConnected(false);
    setUseMongoDBBackend(false);
  };
  
  const handleToggleUseMongoDBBackend = (checked: boolean) => {
    setUseMongoDBBackend(checked);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database size={20} />
          {t('mongoDBConnection')}
        </CardTitle>
        <CardDescription>
          {t('databaseConfig')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="connectionString">{t('connectionString')}</Label>
          <Input
            id="connectionString"
            value={connectionString}
            onChange={(e) => setConnectionString(e.target.value)}
            disabled={isConnected}
            placeholder="mongodb://username:password@hostname:port"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dbName">{t('databaseName')}</Label>
          <Input
            id="dbName"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
            disabled={isConnected}
            placeholder="portfolio"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="collection">{t('collectionName')}</Label>
          <Input
            id="collection"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            disabled={isConnected}
            placeholder="projects"
          />
        </div>
        
        {isConnected && (
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Server size={16} className="text-green-500" />
              <span>{t('connected')}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span>Use MongoDB for projects</span>
              <Switch 
                checked={useMongoDBBackend} 
                onCheckedChange={handleToggleUseMongoDBBackend} 
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isConnected ? (
          <Button onClick={handleConnect} className="w-full">
            {t('connect')}
          </Button>
        ) : (
          <Button onClick={handleDisconnect} variant="destructive" className="w-full">
            {t('disconnect')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MongoDBConfig;
