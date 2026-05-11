'use client';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useAuthHydration } from '@/hooks/useAuth';
import { I18nProvider } from '@/i18n/context';

function AuthHydrator({ children }: { children: React.ReactNode }) {
  useAuthHydration();
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nProvider>
        <AuthHydrator>{children}</AuthHydrator>
      </I18nProvider>
    </Provider>
  );
}
