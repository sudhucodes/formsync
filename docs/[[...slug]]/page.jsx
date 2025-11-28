import { notFound } from "next/navigation";
import {
    DocstraBody,
    DocstraHeader,
    DocstraPage,
    DocstraProvider,
    DocstraSidebar,
    DocstraTOC,
    DocstraCodeBlock,
} from "docstra";

import { DocstraMDXCompiler, getFileContents } from "docstra/server";
import docstraConfig from "@/docstra.config";


export async function generateMetadata({ params }) {
    const { slug } = await params;
    const { metadata } = getFileContents({
        slug,
        CONTENT_DIR: "/app/(docs-pages)/docs/content",
    });

    return {
        title: metadata.title,
        description: metadata.description,
    };
}

export default async function Page({ params }) {
    const { slug } = await params;

    let mdxData;

    try {
        mdxData = getFileContents({
            slug,
            CONTENT_DIR: "/app/(docs-pages)/docs/content",
        });
    } catch {
        notFound();
    }

    return (
        <DocstraProvider docstraConfig={docstraConfig} mdxData={mdxData}>
            <DocstraHeader />
            <DocstraPage>
                <DocstraSidebar />

                <DocstraBody>
                    <DocstraMDXCompiler
                        mdxContent={mdxData.mdxContent}
                        components={{
                            pre: DocstraCodeBlock,
                        }}
                    />
                </DocstraBody>

                <DocstraTOC />
            </DocstraPage>
        </DocstraProvider>
    );
}