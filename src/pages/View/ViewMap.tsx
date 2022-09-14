import type { NextPage } from "next";
import _BaseGuestLayout from "../../layouts/_baseGuestLayout";
import dynamic from "next/dynamic";
import Head from "next/head";

const DynamicCreateMap = dynamic(() =>
    import('../../component/map/CreateMap'), { ssr: false }
);

const ViewMap: NextPage = () => {
    return (
        <_BaseGuestLayout>
            <Head>
                <title>VISRUN</title>
            </Head>
            <DynamicCreateMap />
        </_BaseGuestLayout>
    )
}
export default ViewMap;