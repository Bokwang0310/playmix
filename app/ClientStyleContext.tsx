import { createContext } from "react";

export type ClientStyleContextData = {
  reset: () => void;
};

export default createContext<ClientStyleContextData>({
  reset: () => {},
});
