'use client';

interface SkeletonLoaderProps {
    variant?: 'text' | 'card' | 'avatar' | 'button';
    className?: string;
    count?: number;
}

export const SkeletonLoader = ({
    variant = 'text',
    className = '',
    count = 1
}: SkeletonLoaderProps) => {
    const variants = {
        text: 'h-4 w-full rounded',
        card: 'h-48 w-full rounded-xl',
        avatar: 'h-12 w-12 rounded-full',
        button: 'h-10 w-24 rounded-lg',
    };

    const skeletons = Array.from({ length: count }, (_, i) => i);

    return (
        <>
            {skeletons.map((i) => (
                <div
                    key={i}
                    className={`skeleton shimmer ${variants[variant]} ${className}`}
                />
            ))}
        </>
    );
};

export const SkeletonCard = ({ className = '' }: { className?: string }) => {
    return (
        <div className={`glass-card p-6 space-y-4 ${className}`}>
            <div className="flex items-center space-x-4">
                <SkeletonLoader variant="avatar" />
                <div className="flex-1 space-y-2">
                    <SkeletonLoader variant="text" className="w-3/4" />
                    <SkeletonLoader variant="text" className="w-1/2" />
                </div>
            </div>
            <SkeletonLoader variant="text" count={3} className="mb-2" />
            <SkeletonLoader variant="button" />
        </div>
    );
};
