import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingProps = {
    fullPage?: boolean;
    text?: string;
    className?: string;
};

export default function Loading({
    fullPage = false,
    text = "Loading...",
    className,
}: LoadingProps) {
    if (fullPage) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-black" />
                    <p className="text-sm text-gray-500">{text}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex items-center justify-center py-12", className)}>
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-black" />
                <p className="text-sm text-gray-500">{text}</p>
            </div>
        </div>
    );
}