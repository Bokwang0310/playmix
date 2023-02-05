import { ReactNode } from "react";
import { useHydrated } from "~/hooks/useHydrated";

type Props = {
  children: () => ReactNode;
  fallback?: ReactNode;
};

export default function ({ children, fallback = null }: Props) {
  return useHydrated() ? <>{children()}</> : <>{fallback}</>;
}
