import Link from "next/link";
import { DynamicForm3 } from "@/app/components/dynamicForm/dynamicForm3";
import { LpmLandingPageTemplate_1 } from "@/app/components/assetBuilder/templates/landingpage/LPM/template_1";
import Head from 'next/head';
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function LandingPage({ data, error }) {
    if (!data) return <div className='container text-center'>Loading...</div>;
    if (error) return <div className='container text-center'>Page Not Found</div>;
    return (
       <>
         <Head>
                <title>{data.title}</title>
            </Head>
       <LpmLandingPageTemplate_1 temp={data} />
       </>
    )
}

export async function getServerSideProps(context) {
    try {
        const { url } = context.query;
        const apiUrl = `http://localhost:5000/api/landingpage/${url}`;
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
