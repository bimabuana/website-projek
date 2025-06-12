// resources/js/types/global.d.ts

import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

// Definisikan tipe User yang sesuai backend-mu
interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any;
}

// Tipe global yang akan digunakan di usePage<PageProps>()
interface AppPageProps {
  auth: {
    user: User;
  };
}

declare global {
  interface Window {
    axios: AxiosInstance;
  }

  var route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
  interface PageProps extends InertiaPageProps, AppPageProps {}
}
