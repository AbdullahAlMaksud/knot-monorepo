import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ErrorProps = {
    message?: string;
    onRetry?: () => void;
    fullPage?: boolean;
    className?: string;
};

export default function ErrorState({
    message = "Something went wrong. Please try again.",
    onRetry,
    fullPage = false,
    className,
}: ErrorProps) {
    if (fullPage) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4 text-center px-4">
                    <AlertCircle className="h-10 w-10 text-red-500" />
                    <div>
                        <p className="text-lg font-medium text-gray-900">Oops!</p>
                        <p className="mt-1 text-sm text-gray-500">{message}</p>
                    </div>
                    {onRetry && (
                        <Button
                            variant="outline"
                            className="rounded-full gap-2"
                            onClick={onRetry}
                        >
                            <RefreshCw className="h-4 w-4" />
                            Try again
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex items-center justify-center py-12", className)}>
            <div className="flex flex-col items-center gap-4 text-center px-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div>
                    <p className="text-sm font-medium text-gray-900">Oops!</p>
                    <p className="mt-1 text-sm text-gray-500">{message}</p>
                </div>
                {onRetry && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full gap-2"
                        onClick={onRetry}
                    >
                        <RefreshCw className="h-3 w-3" />
                        Try again
                    </Button>
                )}
            </div>
        </div>
    );
}