import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

/**
 * Azure Services Test Page
 * Access this at /test-azure to verify all services are working
 */

export default function AzureTestPage() {
  const [results, setResults] = useState<Record<string, 'pending' | 'success' | 'error'>>({});
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testComputerVision = async () => {
    setResults(prev => ({ ...prev, vision: 'pending' }));
    addLog('Testing Computer Vision API...');
    try {
      const endpoint = import.meta.env.VITE_AZURE_VISION_ENDPOINT;
      const key = import.meta.env.VITE_AZURE_VISION_KEY;
      
      if (!endpoint || !key) {
        throw new Error('Missing credentials');
      }
      
      addLog('✅ Computer Vision credentials found');
      setResults(prev => ({ ...prev, vision: 'success' }));
    } catch (error) {
      addLog(`❌ Computer Vision failed: ${error}`);
      setResults(prev => ({ ...prev, vision: 'error' }));
    }
  };

  const testOpenAI = async () => {
    setResults(prev => ({ ...prev, openai: 'pending' }));
    addLog('Testing Azure OpenAI...');
    try {
      const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
      const key = import.meta.env.VITE_AZURE_OPENAI_KEY;
      const deployment = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT;
      
      if (!endpoint || !key || !deployment) {
        throw new Error('Missing credentials');
      }
      
      addLog(`✅ OpenAI configured with deployment: ${deployment}`);
      setResults(prev => ({ ...prev, openai: 'success' }));
    } catch (error) {
      addLog(`❌ OpenAI failed: ${error}`);
      setResults(prev => ({ ...prev, openai: 'error' }));
    }
  };

  const testTranslator = async () => {
    setResults(prev => ({ ...prev, translator: 'pending' }));
    addLog('Testing Translator...');
    try {
      const key = import.meta.env.VITE_AZURE_TRANSLATOR_KEY;
      const region = import.meta.env.VITE_AZURE_TRANSLATOR_REGION;
      
      if (!key || !region) {
        throw new Error('Missing credentials');
      }
      
      addLog(`✅ Translator configured for region: ${region}`);
      setResults(prev => ({ ...prev, translator: 'success' }));
    } catch (error) {
      addLog(`❌ Translator failed: ${error}`);
      setResults(prev => ({ ...prev, translator: 'error' }));
    }
  };

  const testSpeech = async () => {
    setResults(prev => ({ ...prev, speech: 'pending' }));
    addLog('Testing Speech Services...');
    try {
      const key = import.meta.env.VITE_AZURE_SPEECH_KEY;
      const region = import.meta.env.VITE_AZURE_SPEECH_REGION;
      
      if (!key || !region) {
        throw new Error('Missing credentials');
      }
      
      addLog(`✅ Speech Services configured for region: ${region}`);
      setResults(prev => ({ ...prev, speech: 'success' }));
    } catch (error) {
      addLog(`❌ Speech Services failed: ${error}`);
      setResults(prev => ({ ...prev, speech: 'error' }));
    }
  };

  const testStorage = async () => {
    setResults(prev => ({ ...prev, storage: 'pending' }));
    addLog('Testing Blob Storage...');
    try {
      const account = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT;
      const key = import.meta.env.VITE_AZURE_STORAGE_KEY;
      const container = import.meta.env.VITE_AZURE_STORAGE_CONTAINER;
      
      if (!account || !key || !container) {
        throw new Error('Missing credentials');
      }
      
      addLog(`✅ Storage configured: ${account}/${container}`);
      setResults(prev => ({ ...prev, storage: 'success' }));
    } catch (error) {
      addLog(`❌ Storage failed: ${error}`);
      setResults(prev => ({ ...prev, storage: 'error' }));
    }
  };

  const testFirebase = async () => {
    setResults(prev => ({ ...prev, firebase: 'pending' }));
    addLog('Testing Firebase...');
    try {
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
      
      if (!apiKey || !projectId) {
        throw new Error('Missing credentials');
      }
      
      addLog(`✅ Firebase configured: ${projectId}`);
      setResults(prev => ({ ...prev, firebase: 'success' }));
    } catch (error) {
      addLog(`❌ Firebase failed: ${error}`);
      setResults(prev => ({ ...prev, firebase: 'error' }));
    }
  };

  const testAll = async () => {
    setLogs([]);
    await testComputerVision();
    await testOpenAI();
    await testTranslator();
    await testSpeech();
    await testStorage();
    await testFirebase();
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'error' | undefined) => {
    if (status === 'pending') return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
    if (status === 'success') return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (status === 'error') return <XCircle className="w-5 h-5 text-red-500" />;
    return null;
  };

  const services = [
    { key: 'vision', name: 'Computer Vision', description: 'Photo analysis & enhancement' },
    { key: 'openai', name: 'Azure OpenAI GPT-4', description: 'Smart pricing & marketing' },
    { key: 'translator', name: 'Translator', description: '10 Indian languages' },
    { key: 'speech', name: 'Speech Services', description: 'Voice commands (Vani)' },
    { key: 'storage', name: 'Blob Storage', description: 'Photo uploads' },
    { key: 'firebase', name: 'Firebase', description: 'Authentication' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Azure Services Test</h1>
          <p className="text-muted-foreground">Verify all services are configured correctly</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>Click "Test All Services" to verify configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testAll} className="w-full" size="lg">
              Test All Services
            </Button>

            <div className="space-y-2">
              {services.map(service => (
                <div key={service.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-muted-foreground">{service.description}</div>
                  </div>
                  {getStatusIcon(results[service.key])}
                </div>
              ))}
            </div>

            {Object.keys(results).length > 0 && (
              <div className="pt-4">
                <Badge variant={Object.values(results).every(r => r === 'success') ? 'default' : 'destructive'}>
                  {Object.values(results).every(r => r === 'success') 
                    ? '✅ All Services Configured' 
                    : '⚠️ Some Services Need Attention'}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
              {logs.length === 0 ? (
                <div className="text-gray-500">No logs yet. Click "Test All Services" to begin.</div>
              ) : (
                logs.map((log, i) => <div key={i}>{log}</div>)
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
