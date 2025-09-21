import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const FirebaseTestPage = () => {
  const [testResults, setTestResults] = useState({
    connection: 'Testing...',
    write: 'Not tested',
    read: 'Not tested'
  });

  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const testFirebaseConnection = async () => {
    try {
      // Test 1: Firebase connection
      setTestResults(prev => ({ ...prev, connection: 'Connected ✅' }));

      // Test 2: Write operation
      try {
        const docRef = await addDoc(collection(db, 'test'), {
          message: 'Firebase test',
          timestamp: new Date()
        });
        setTestResults(prev => ({ ...prev, write: `Write successful ✅ (${docRef.id})` }));
      } catch (writeError) {
        setTestResults(prev => ({ ...prev, write: `Write failed ❌: ${writeError.message}` }));
      }

      // Test 3: Read operation
      try {
        const querySnapshot = await getDocs(collection(db, 'test'));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTestResults(prev => ({ ...prev, read: `Read successful ✅ (${docs.length} documents)` }));
      } catch (readError) {
        setTestResults(prev => ({ ...prev, read: `Read failed ❌: ${readError.message}` }));
      }

    } catch (error) {
      setTestResults(prev => ({ ...prev, connection: `Failed ❌: ${error.message}` }));
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Firebase Integration Test</h1>
      
      <div style={{ 
        background: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '8px',
        marginBottom: '1rem'
      }}>
        <h3>Test Results:</h3>
        <p><strong>Connection:</strong> {testResults.connection}</p>
        <p><strong>Write Test:</strong> {testResults.write}</p>
        <p><strong>Read Test:</strong> {testResults.read}</p>
      </div>

      <button 
        onClick={testFirebaseConnection}
        style={{
          background: '#E57373',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Re-run Tests
      </button>
    </div>
  );
};

export default FirebaseTestPage;