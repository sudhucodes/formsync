import Link from "next/link";

export default function Page() {
    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-semibold">
                FormSync SDK
            </h1>
            <div className="flex items-center gap-3 mt-6">
                <Link href='/forms' className="bg-black text-white px-6 py-2 rounded-lg">
                    List Forms
                </Link>
            </div>
        </main>
    )
}