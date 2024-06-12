import { PropsWithChildren, createContext, useContext, useState } from "react";

interface TokenContextProps {
  token: string;
  setToken: (token: string) => void;
}

const TokenContext = createContext<TokenContextProps>(undefined);

export default function TokenContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string>();
  const value: TokenContextProps = {
    token,
    setToken,
  };
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}

export function useTokenContext() {
  const context = useContext<TokenContextProps>(TokenContext);
  if (context === undefined) {
    throw new Error("this hook must be used inside context!");
  }
  return context;
}
