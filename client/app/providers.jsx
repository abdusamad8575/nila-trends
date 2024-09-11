"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Provider } from 'react-redux';
import store from '../redux/store';



export function Providers({children}){
 
  return (

      // <NextThemesProvider attribute="class" defaultTheme="dark">
      <Provider store={store}>
        {children}
        </Provider>
      // </NextThemesProvider>
  )
}