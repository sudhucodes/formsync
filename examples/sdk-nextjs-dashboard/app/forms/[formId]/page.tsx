import { formsync } from "@/config/formsync";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ formId: string }> }) {
    const { formId } = await params;

    const res = await formsync.submissions.list({ formId });

    if (!res.success) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10">
                <p className="text-sm text-neutral-500">No submissions found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Submissions
                </h1>
                <p className="text-sm text-neutral-500 mt-1">
                    Form ID: {formId}
                </p>
            </div>

            <div className="flex flex-col divide-y divide-zinc-200">
                {res.submissions.length === 0 ? (
                    <p className="text-sm text-neutral-500 py-6">
                        No submissions yet.
                    </p>
                ) : (
                    res.submissions.map((submission) => (
                        <div
                            key={submission._id}
                            className="py-5 flex flex-col gap-4"
                        >
                            <div className="grid grid-cols-1 gap-2">
                                {Object.entries(submission.data).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex justify-between gap-2 text-sm"
                                    >
                                        <span className="text-neutral-500 capitalize">
                                            {key}
                                        </span>
                                        <span className="font-medium text-right">
                                            {String(value)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-neutral-500">
                                Submitted on{" "}
                                {new Date(submission.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}