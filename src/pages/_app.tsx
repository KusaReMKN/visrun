import '../styles/globals.css';
import '../styles/App.css';
import type { AppProps } from 'next/app'
import { createContext, useState } from "react";

export const DateContext = createContext({} as {
  date: string,
  setDate: React.Dispatch<React.SetStateAction<string>>
})

const getDateString = (d: Date) => {
  return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [date, setDate] = useState<string>(getDateString(new Date()));
  return (
    <DateContext.Provider value={{ date, setDate }}>
      <Component {...pageProps} />
    </DateContext.Provider>
  )
}

export default MyApp
