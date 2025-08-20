import { useState } from 'react';
import { rickAndMortyApi } from '../api/resource';

export function ApiTest() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    console.log('🧪 Iniciando prueba de API...');
    setLoading(true);
    setError(null);
    
    try {
      console.log('📡 Probando endpoint de personajes...');
      const response = await rickAndMortyApi.characters.getAll({ page: 1 });
      console.log('✅ Respuesta exitosa:', response);
      setResult(response);
    } catch (err) {
      console.error('❌ Error en prueba:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-bold mb-4">🧪 Prueba de API</h3>
      
      <button 
        onClick={testApi}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Probando...' : 'Probar API'}
      </button>

      {loading && (
        <div className="mt-4 p-2 bg-yellow-100 text-yellow-800 rounded">
          ⏳ Probando conexión con la API...
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded">
          ❌ Error: {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
          ✅ API funcionando correctamente
          <div className="text-sm mt-2">
            <strong>Personajes obtenidos:</strong> {result.results?.length || 0}
          </div>
          <div className="text-sm">
            <strong>Total disponibles:</strong> {result.info?.count || 0}
          </div>
        </div>
      )}
    </div>
  );
}
