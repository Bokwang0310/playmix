import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useState, useMemo, ReactNode } from "react";
import { hydrateRoot } from "react-dom/client";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import ClientStyleContext from "./ClientStyleContext";
import createEmotionCache from "./createEmotionCache";
import theme from "./theme";

type Props = {
  children: ReactNode;
};

function ClientCacheProvider({ children }: Props) {
  const [cache, setCache] = useState(createEmotionCache());

  const clientStyleContextValue = useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    []
  );

  return (
    <ClientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <ClientCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StrictMode>
            <RemixBrowser />
          </StrictMode>
        </ThemeProvider>
      </ClientCacheProvider>
    );
  });
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
