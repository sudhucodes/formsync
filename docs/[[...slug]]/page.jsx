import { docs } from "@/.docstra/index";
import docstraConfig from "@/docstra.config";
import { useMDXComponents } from "@/mdx-components";
import {
    DocstraBody,
    DocstraHeader,
    DocstraPage,
    DocstraProvider,
    DocstraSidebar,
    DocstraTOC,
} from "docstra";

import { DocstraMDXCompiler, getPageData } from "docstra/server";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const { slug } = await params
    const pageData = getPageData(slug, docs);
    if (!pageData) return notFound();

    return (
        <DocstraProvider docstraConfig={docstraConfig} pageData={pageData} docs={docs}>
            <DocstraHeader />
            <DocstraPage>
                <DocstraSidebar />

                <DocstraBody>
                    <DocstraMDXCompiler
                        content={pageData.content}
                        components={useMDXComponents()}
                    />
                </DocstraBody>

                <DocstraTOC />
            </DocstraPage>
        </DocstraProvider>
    );
}