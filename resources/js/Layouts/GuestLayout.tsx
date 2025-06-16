import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-sky-500 to-cyan-200 flex items-center justify-center relative overflow-hidden">
            {children}
        </div>
    );
}
