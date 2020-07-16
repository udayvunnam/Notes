import "../styles/global.css";
import "../styles/tachyons.css";
import { AppProps } from "next/app";
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="ph6">
      <ReactQueryConfigProvider config={{ queries: { staleTime: 60000 } }}>
        <Component {...pageProps} />
      </ReactQueryConfigProvider>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
