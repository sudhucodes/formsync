import { formsync } from "@/config/formsync";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
    const res = await formsync.forms.list();

    if (!res.success) throw new Error(res.message);

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight">Forms</h1>
                <p className="text-neutral-500 mt-1 text-sm">
                    All your available forms and their submissions
                </p>
            </div>

            <div className="flex flex-col divide-y divide-zinc-200">
                {res.forms.length === 0 ? (
                    <p className="text-sm text-neutral-500 py-6">
                        No forms found.
                    </p>
                ) : (
                    res.forms.map((form) => (
                        <div key={form._id} className="py-5 flex flex-col gap-4">

                            <div className="flex items-center gap-3">
                                <div className="text-xl bg-zinc-100 size-10 flex items-center justify-center rounded-md">
                                    {form.icon}
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-base font-medium">
                                        {form.title}
                                    </p>
                                    <span className="text-xs text-neutral-500">
                                        ID: {form.formId}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-neutral-500">
                                Created {new Date(form.createdAt).toLocaleDateString()}
                            </p>

                            <Link
                                href={`/forms/${form.formId}`}
                                className="text-sm bg-blue-600 text-white rounded-md py-2 text-center hover:bg-blue-700 transition"
                            >
                                View submissions →
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}