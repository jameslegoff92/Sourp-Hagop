"use client";

import { useState } from 'react';
import { client } from '@/lib/sanity';

export default function TestSanity() {
  const [result, setResult] = useState('');

  const testConnection = async () => {
    try {
      const data = await client.fetch('*[0...5]');
      setResult(`Success! Found ${data.length} documents`);
    } catch (error) {
      setResult(`
Error Details:
- Message: ${error.message}
- Status: ${error.statusCode || 'Unknown'}
- Details: ${error.details || 'None'}
- Stack: ${error.stack}
- Full error: ${JSON.stringify(error, null, 2)}
      `);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Detailed Sanity Error Test</h1>
      <button onClick={testConnection}>Test With Error Details</button>
      <pre style={{ background: '#f5f5f5', padding: '10px', marginTop: '20px', fontSize: '12px' }}>
        {result || 'Click to test'}
      </pre>
    </div>
  );
}