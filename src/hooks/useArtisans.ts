import { useState, useEffect } from 'react';

export interface Artisan {
  id: string;
  name: string;
  craft: string;
  state: string;
  bio: string;
  portrait: string;
  story: string;
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
    whatsapp?: string;
    amazonLink?: string;
  }[];
  processVideo: string;
  commissionSettings: {
    acceptingCommissions: boolean;
    minimumBudget: number | null;
  };
}

export function useArtisans() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with Azure Functions API call
    // Example: fetch('/api/artisans') backed by Azure SQL/Cosmos DB
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        // Simulating API call
        // In production: await fetch('https://your-azure-function.azurewebsites.net/api/artisans')
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For now, return empty array until backend is connected
        setArtisans([]);
        setError(null);
      } catch (err) {
        setError('Failed to load artisans');
        console.error('Error fetching artisans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  return { artisans, loading, error };
}
