import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../lib/utils";

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
}

export function DialogContent({ className, children, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-lg",
          className
        )}
        aria-describedby={undefined} // Prevents missing description warning
        {...props}
      >
        <DialogTitle className="sr-only">Dialog</DialogTitle> {/* Hidden for accessibility */}
        <DialogDescription className="sr-only">Dialog Content</DialogDescription> {/* Hidden for accessibility */}

        {children}

        <DialogPrimitive.Close className="absolute top-3 right-3 text-gray-500 hover:text-black">
          ✕
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ className, children }: React.ComponentPropsWithoutRef<"h2">) {
  return <DialogPrimitive.Title className={cn("text-lg font-semibold", className)}>{children}</DialogPrimitive.Title>;
}

export function DialogDescription({ className, children }: React.ComponentPropsWithoutRef<"p">) {
  return <DialogPrimitive.Description className={cn("text-sm text-gray-600", className)}>{children}</DialogPrimitive.Description>;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return <button ref={ref} className={`px-4 py-2 rounded-md ${className}`} {...props} />;
});

Button.displayName = "Button";
