
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import MongoDBService from '@/services/mongodb';
import { useProjectStore } from '@/hooks/useProjectStore';
import { Database, Server } from 'lucide-react';

const MongoDBConfig = () => {
  const { toast } = useToast();
  const { useMongoDBBackend, setUseMongoDBBackend } = useProjectStore();
  const mongoService = MongoDBService.getInstance();
  
  const [connectionString, setConnectionString] = useState(mongoService.connectionString || '');
  const [database, setDatabase] = useState(mongoService.database || '');
  const [collection, setCollection] = useState(mongoService.collection || '');
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      const success = await mongoService.connect(connectionString, database, collection);
      
      if (success) {
        toast({
          title: 'Connected to MongoDB',
          description: `Database: ${database}, Collection: ${collection}`,
        });
        setUseMongoDBBackend(true);
      } else {
        toast({
          title: 'Connection Failed',
          description: 'Could not connect to MongoDB. Please check your credentials.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while connecting to MongoDB.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2" />
          MongoDB Configuration
        </CardTitle>
        <CardDescription>
          Configure MongoDB connection to save and load projects
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              checked={useMongoDBBackend}
              onCheckedChange={setUseMongoDBBackend}
              id="mongodb-toggle"
            />
            <Label htmlFor="mongodb-toggle">Use MongoDB Backend</Label>
          </div>
          <div className="text-sm text-muted-foreground">
            {useMongoDBBackend ? 'Projects will be saved to MongoDB' : 'Projects will be saved locally'}
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="connection-string">Connection String</Label>
            <Input
              id="connection-string"
              value={connectionString}
              onChange={(e) => setConnectionString(e.target.value)}
              placeholder="mongodb://username:password@localhost:27017"
            />
          </div>
          
          <div>
            <Label htmlFor="database">Database Name</Label>
            <Input
              id="database"
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              placeholder="portfolio"
            />
          </div>
          
          <div>
            <Label htmlFor="collection">Collection Name</Label>
            <Input
              id="collection"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              placeholder="projects"
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleConnect} 
          disabled={isConnecting || !connectionString || !database || !collection}
          className="w-full"
        >
          <Server className="h-4 w-4 mr-2" />
          {isConnecting ? 'Connecting...' : 'Connect to MongoDB'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MongoDBConfig;
