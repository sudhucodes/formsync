import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';
import { notFound } from 'next/navigation';
import { getFileContents } from '@/utilities/get-file-path-of-mdx';
import PageCopyButtons from '@/docs-components/page-copy-buttons';
import Feedback from '@/docs-components/feedback';

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
    try {
        const { data, content, rawFile } = getFileContents(slug);
        fileContent = content
        fileData = data
        rawFileData = rawFile
    } catch {
        notFound();
    }
    return (
        <>
            <h1 className="text-3xl font-bold">{fileData.title}</h1>
            <p className="my-4 text-gray-500">{fileData.description}</p>
            <PageCopyButtons content={rawFileData} />
            <hr className="my-10 border-gray-200" />
            <MDXRemote source={fileContent} components={useMDXComponents()} />
            <Feedback />
        </>
    );
}
