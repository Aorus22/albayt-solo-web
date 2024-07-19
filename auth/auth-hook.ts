import { useEffect, useState } from 'react';
import { onAuthStateChanged } from './auth';
import { User } from 'firebase/auth';

export function useUserSession() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        (async() =>{
          try {
              const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ user: authUser }), 
              });
          
              if (!response.ok) {
                throw new Error('Gagal melakukan login');
              }

              setUser(authUser);

            } catch (error) {
              console.error('Error saat login:', error);
            }
      })()

      } else {
        setUser(null);
        (async() =>{
          try {
              const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', 
                }, 
              });
          
              if (!response.ok) {
                throw new Error('Gagal melakukan logout');
              }

            } catch (error) {
              console.error('Error saat logout:', error);
            }

      })()
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}