"use client";

import { useState } from "react";

import { MailPlus } from "lucide-react";
import { motion } from "framer-motion";

import ConnectMailboxModal from "./ConnectMailboxModal";

export default function MailboxHeader() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >
                {/* Left */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-text-primary">
                        Mailbox Integration
                    </h1>

                    <p className="mt-2 max-w-2xl text-text-secondary">
                        Manage recruiter mailboxes, monitor email synchronization,
                        and automate applicant resume ingestion workflows.
                    </p>
                </div>

                {/* Right */}
                <button
                    onClick={() => setOpen(true)}
                    className="
            flex items-center justify-center gap-2
            rounded-xl
            bg-primary
            px-5 py-3
            text-sm font-medium text-white
            shadow-sm
            transition-all duration-base ease-standard focus-ring active:scale-[0.97]
            hover:bg-primary-hover
            w-full md:w-auto
        "
                >
                    <MailPlus className="h-4 w-4" />
                    Connect Mailbox
                </button>
            </motion.div>

            {/* Modal */}
            <ConnectMailboxModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}