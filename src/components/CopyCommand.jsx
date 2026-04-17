import { useState } from "react";

export default function CopyCommand() {
    const [copied, setCopied] = useState(false);
    const command = "curl -fsSL https://denisha.co.in/install.sh | bash";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="mb-16">
            <div
                onClick={handleCopy}
                className="inline-flex items-center gap-4 bg-[#11111b] border border-[#cba6f7]/20 rounded-xl p-4 pr-6 backdrop-blur-md group hover:bg-[#11111b]/80 transition-colors cursor-pointer relative overflow-hidden"
            >
                <span className="text-[#cba6f7] select-none">$</span>
                <code className="font-mono text-[#a6e3a1] text-lg">
                    {command}
                </code>
                <div className="w-px h-6 bg-[#45475a] mx-2"></div>

                <div className="relative w-5 h-5 flex items-center justify-center">
                    {/* Copy Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`text-[#6c7086] group-hover:text-[#cdd6f4] transition-all absolute ${copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                    >
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                    </svg>

                    {/* Check Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`text-[#a6e3a1] transition-all absolute ${copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>


            </div>
        </div>
    );
}
