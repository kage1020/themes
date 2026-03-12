import { useCallback, useState } from "react";

export default function useDisclosure() {
  const [isOpen, setOpen] = useState(false);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  const onToggle = useCallback(() => setOpen((prev) => !prev), []);

  return { isOpen, onOpen, onClose, onToggle };
}
