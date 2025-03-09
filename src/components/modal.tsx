import useMediaQuery from "@/hooks/useMediaQuery";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "./ui/drawer";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (bool: boolean) => void;
  useDrawerOnMobile?: boolean;

  title?: string;
  description?: string;
};
export const Modal = ({
  children,
  isOpen,
  onOpenChange,
  title,
  description,
  useDrawerOnMobile = false,
}: ModalProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop || !useDrawerOnMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="p-4">
        {title && <DrawerHeader>{title}</DrawerHeader>}
        {description && <DrawerDescription>{description}</DrawerDescription>}
        {children}
      </DrawerContent>
    </Drawer>
  );
};
