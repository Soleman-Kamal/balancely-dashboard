const RevenueHeader = () => {
    return (
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                    Financial Performance
                </p>

                <h1 className="mt-2 text-4xl font-bold text-slate-900 dark:text-slate-50">
                    Revenue Overview
                </h1>

                <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
                    Monitor revenue streams, monthly growth, and payment performance
                    across the business.
                </p>
            </div>

            <button
                type="button"
                className="w-fit rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
                Export Report
            </button>
        </section>
    );
};

export default RevenueHeader;