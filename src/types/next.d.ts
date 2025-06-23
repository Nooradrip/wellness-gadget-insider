// src/types/next.d.ts
import { NextPage } from 'next';

declare module 'next' {
  export type NextPageParams<P = {}, IP = P> = NextPage<P, IP> & {
    params: {
      [key: string]: string | string[];
    };
    searchParams?: {
      [key: string]: string | string[] | undefined;
    };
  };
}