import Link from "next/link";
import { LpmMailerTemplate } from "@/app/components/assetBuilder/templates/mailer/LPM/template_1";
const fetcher = (url) => fetch(url).then((res) => res.json());
import Head from 'next/head';
export default function Mailer({ data, error }) {

    if (!data) return <div className='container text-center'>Loading...</div>;
    if (error) return <div className="container">Error loading data</div>

    return (
        <>
            <Head>
                <title>{data.title}</title>
            </Head>
            <LpmMailerTemplate temp={data} />
        </>

    )
}

export async function getServerSideProps(context) {
    try {
        const { url } = context.query;
        console.log(url)
        const apiUrl = `http://localhost:5000/api/mailer/${url}`;
        const data = await fetcher(apiUrl);
        console.log('request', data)
        return {
            props: { data },
        };
    } catch (error) {
        return {
            props: { error: true },
        };
    }
}
