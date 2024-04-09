import Link from "next/link";
import Head from 'next/head';
const fetcher = (url) => fetch(url).then((res) => res.json());
import { DownloadPageTemplate_1 } from "@/app/components/assetBuilder/templates/downloadpage/template_1";
export default function DownloadPage({ data, error }) {
    if (!data) return <div className='container text-center'>Loading...</div>;
    return (
        <>
            <Head>
                <title>{data.title}</title>
            </Head>
            <DownloadPageTemplate_1 temp={data} />
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        const { url } = context.query;
        const apiUrl = `http://localhost:5000/api/downloadpage/${url}`;
        const data = await fetcher(apiUrl);
        return {
            props: { data },
        };
    } catch (error) {
        return {
            props: { error: true },
        };
    }
}
