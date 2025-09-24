"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { FiX } from "react-icons/fi";

interface ModalCustomProps {
  btn?: React.ReactNode;
  content: React.ReactNode;
  isOpen?: boolean;
}

const ModalCustom = ({ btn, content, isOpen }: ModalCustomProps) => {
  const [open, setOpen] = React.useState(isOpen || false);

  React.useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{btn}</DialogTrigger>

      <DialogContent
        className="
          bg-transparent border-none shadow-none
          w-[95vw] max-w-[800px] sm:w-[90vw] md:w-[80vw] lg:w-[70vw]
          max-h-[calc(100vh-4rem)]
          p-2 sm:p-4 md:p-6 
          focus:outline-none
          overflow-visible
         
        "
      >
        <div
          className="
            w-full relative bg-card text-card-foreground rounded-xl
            p-4 sm:p-5 md:p-6
            flex flex-col gap-4
            border border-border shadow-2xl
            overflow-hidden

          "
        >
          <DialogTitle className="sr-only">Driver Details</DialogTitle>

          <DialogClose
            className="
              absolute top-3 right-3 sm:top-4 sm:right-4 z-20
              w-8 h-8 sm:w-9 sm:h-9
              rounded-full bg-destructive flex items-center justify-center
              hover:bg-destructive/80 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
              transition-all duration-200 shadow-lg hover:shadow-xl
              cursor-pointer
            "
            aria-label="Close dialog"
          >
            <FiX className="text-white" size={16} />
          </DialogClose>

          <div
            className="
              modal-body overflow-y-auto
              max-h-[calc(100vh-8rem)]
              pr-2
              scrollbar-thin scrollbar-thumb-rounded
               my-9 md:m-0
            "
          >
            {content}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCustom;
