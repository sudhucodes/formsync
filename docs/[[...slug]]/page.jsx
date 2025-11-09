import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';
import { notFound } from 'next/navigation';
import { getFileContents } from '@/utilities/get-file-path-of-mdx';
import PageCopyButtons from '@/docs-components/page-copy-buttons';
import Feedback from '@/docs-components/feedback';
import { DocsProvider } from '@/context/docs-context';
import Breadcrumbs from '@/docs-components/breadcrumbs';
import Header from '@/docs-components/header';
import NextStep from '@/docs-components/next-step';
import Sidebar from '@/docs-components/sidebar';
import TableOfContents from '@/docs-components/tabel-of-contents';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const { data } = getFileContents(slug);

    return {
        title: data.title || 'Docs',
        description: data.description || 'FormSync is a powerful and easy-to-use form submission solution that allows you to accept form submissions from your website or app. With FormSync, you can easily create a form, customize its appearance and handle form submissions in a few simple steps.',
        keywords: data.keywords || 'formsync, formsync docs, form sync, form submissions, formsync integrations, html forms, react forms, next forms, form sync, form submissions, formsync integrations, html forms, react forms, next forms',
    };
}

export default async function DocPage({ params }) {
    const { slug } = await params;
    let fileContent;
    let fileData
    let rawFileData
    let filePath
    try {
        const { data, content, rawFile, filePath: path } = getFileContents(slug);
        fileContent = content
        fileData = data
        rawFileData = rawFile
        filePath = path
    } catch {
        notFound();
    }
    return (
        <>
            <DocsProvider>
                <Header />
                <div className="min-h-screen flex bg-white">
                    <Sidebar />

                    <main id='docs-content' className="w-full text-base/7 px-4 md:px-8 py-10">
                        <Breadcrumbs />
                        <h1 className="text-3xl font-bold">{fileData.title}</h1>
                        <p className="my-4 text-gray-500">{fileData.description}</p>
                        <PageCopyButtons content={rawFileData} />
                        <hr className="my-10 border-gray-200" />
                        <MDXRemote source={fileContent} components={useMDXComponents()} />
                        <Feedback />
                        <NextStep />
                    </main>

                    <TableOfContents filePath={filePath} />
                </div>
            </DocsProvider>
        </>
    );
}
