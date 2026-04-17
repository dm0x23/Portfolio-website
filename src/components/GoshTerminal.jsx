import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

const GoshTerminal = () => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to Gosh - The Go Shell v0.1.0' },
        { type: 'output', content: "Type 'help' for available commands." },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const commands = {
        help: "Available commands: help, clear, version, whoami, ls, install",
        version: "Gosh v1.0.0 (linux/amd64)",
        whoami: "guest",
        ls: "README.md  gosh  LICENSE  go.mod  go.sum",
        install: "To install: curl -fsSL https://denisha.co.in/install.sh | bash",
        gosh: "You are already using gosh!",
    };

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', content: input }];

            if (cmd === 'clear') {
                setHistory([]);
            } else if (cmd) {
                const output = commands[cmd] || `gosh: command not found: ${cmd}`;
                newHistory.push({ type: 'output', content: output });
                setHistory(newHistory);
            } else {
                setHistory(newHistory);
            }

            setInput('');
        }
    };

    return (
        <div
            className="w-full max-w-3xl mx-auto bg-[#11111b] rounded-lg overflow-hidden shadow-2xl shadow-[#cba6f7]/5 border border-[#cba6f7]/10 font-mono text-sm md:text-base my-8"
            onClick={() => inputRef.current?.focus()}
        >
            {/* Terminal Header */}
            <div className="bg-[#2a1b3d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
                </div>
                <div className="flex-1 text-center text-white/40 text-xs">den — gosh — 80x24</div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-[400px] overflow-y-auto text-white/90">
                {history.map((line, i) => (
                    <div key={i} className="mb-1 break-words">
                        {line.type === 'input' ? (
                            <div className="flex gap-2">
                                <span className="text-purple-400">$</span>
                                <span>{line.content}</span>
                            </div>
                        ) : (
                            <div className="text-white/80">{line.content}</div>
                        )}
                    </div>
                ))}

                <div className="flex gap-2 items-center">
                    <span className="text-purple-400">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none flex-1 text-white placeholder-white/20"
                        autoFocus
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default GoshTerminal;
