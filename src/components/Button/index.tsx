/** biome-ignore-all lint/suspicious/noExplicitAny: onClick Returning anything */
"use client";

import MuiButton, {
  type ButtonProps as MuiButtonProps,
} from "@mui/material/Button";
import { useCallback, useEffect, useState } from "react";

export interface ButtonProps extends Omit<MuiButtonProps, "onClick"> {
  loadingInterval?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any | Promise<any>;
}

export function Button({
  children,
  onClick,
  loading: _loading,
  loadingInterval = 0,
  ...props
}: ButtonProps) {
  const [loading, setLoading] = useState(_loading);

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      setLoading(loadingInterval > 0);
      const ended = await onClick?.(e);
      if (ended) setLoading(false);
      else setTimeout(() => setLoading(false), loadingInterval);
    },
    [onClick, loadingInterval],
  );

  useEffect(() => {
    setLoading(_loading);
  }, [_loading]);

  return (
    <MuiButton onClick={handleClick} loading={loading} {...props}>
      {children}
    </MuiButton>
  );
}
