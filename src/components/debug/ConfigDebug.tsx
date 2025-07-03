"use client";

export default function ConfigDebug() {
  if (typeof window === 'undefined') return null;
  
  const vars = {
    'API_KEY': !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    'AUTH_DOMAIN': !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    'DATABASE_URL': !!process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    'PROJECT_ID': !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    'STORAGE_BUCKET': !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    'MESSAGING_SENDER_ID': !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    'APP_ID': !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 text-xs z-50 max-w-xs">
      <h3 className="font-bold mb-2">Firebase Config Debug:</h3>
      {Object.entries(vars).map(([key, exists]) => (
        <div key={key} className="flex justify-between">
          <span>{key}:</span>
          <span>{exists ? '✅' : '❌'}</span>
        </div>
      ))}
      <div className="mt-2 pt-2 border-t">
        <div>Domain: {window.location.hostname}</div>
      </div>
    </div>
  );
}