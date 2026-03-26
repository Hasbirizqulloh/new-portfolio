import * as React from "react";
import { cn } from "@/lib/utils";

// Manual variant mappings to remove need for 'class-variance-authority'
const buttonVariants = (variant: string = "default", size: string = "default") => {
    const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

    const variants: Record<string, string> = {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        cyber: "bg-[#06cee0] text-black font-bold hover:shadow-[0_0_20px_rgba(6,206,224,0.5)] transition-all duration-300",
        "cyber-outline": "border border-[#06cee0] text-[#06cee0] hover:bg-[#06cee0]/10 transition-all duration-300",
    };

    const sizes: Record<string, string> = {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
    };

    return cn(base, variants[variant] || variants.default, sizes[size] || sizes.default);
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "cyber" | "cyber-outline" | null;
    size?: "default" | "sm" | "lg" | "icon" | null;
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        // Simplified: Dropped 'Slot' dependency. 'asChild' is ignored for now to ensure stability.
        // If wrapping is needed, standard composition should be used.
        return (
            <button
                className={cn(buttonVariants(variant || "default", size || "default"), className)}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
