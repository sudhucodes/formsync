import { DocsProvider } from '@/context/docs-context';
import Breadcrumbs from '@/docs-components/breadcrumbs';
import Header from '@/docs-components/header';
import NextStep from '@/docs-components/next-step';
import Sidebar from '@/docs-components/sidebar';
import TableOfContents from '@/docs-components/tabel-of-contents';

export default function DocsLayout({ children }) {
    return (
        <>
            <DocsProvider>
                <Header />
                <div className="min-h-screen flex bg-white">
                    <Sidebar />

                    <main id='docs-content' className="w-full text-base/7 px-4 md:px-8 py-10">
                        <Breadcrumbs />
                        {children}
                        <NextStep />
                    </main>

                    <TableOfContents />
                </div>
            </DocsProvider>
        </>
    );
}
