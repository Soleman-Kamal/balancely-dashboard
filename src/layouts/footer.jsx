export const Footer = () => {
    return (
        <footer className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500 transition-colors dark:border-slate-800 dark:text-slate-400 md:flex-row">
            <div>
                <p>
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Balancely
                    </span>
                    . All rights reserved.
                </p>
            </div>

            <div className="flex items-center gap-6">
                <a
                    href="#"
                    className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                    Privacy Policy
                </a>

                <a
                    href="#"
                    className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                    Terms of Service
                </a>

                <a
                    href="#"
                    className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                    Support
                </a>
            </div>
        </footer>
    );
};