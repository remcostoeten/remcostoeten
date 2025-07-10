import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

type TProps = {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    wide?: boolean;
};

export function ThemedModal({ children, open, onOpenChange, wide = false }: TProps) {
    const widthClasses = wide ? 'max-h-[90vh] w-full sm:max-w-4xl' : 'max-w-lg';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogOverlay />
                <DialogPrimitive.Content
                    className={cn(
                        'fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 bg-background text-foreground dark:bg-[#1a1a1a] p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
                        'border border-gray-200/60 dark:border-gray-800/60',
                        'shadow-xl shadow-gray-900/5 dark:shadow-black/20',
                        widthClasses
                    )}
                >
                    {children}
                    <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    );
}

