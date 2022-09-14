import type { NextPage } from "next";
import _BaseGuestLayout from "../../layouts/_baseGuestLayout";
import dynamic from "next/dynamic";
import Head from "next/head";

const DynamicTestMap = dynamic(() =>
    import('../../component/map/testMap'), { ssr: false }
);

const ViewtestMap: NextPage = () => {
    return (
        <_BaseGuestLayout>
            <Head>
                <title>VISRUN</title>
            </Head>
            <DynamicTestMap />
        </_BaseGuestLayout>
    )
}
export default ViewtestMap;