import { NextPage } from "next";
import _BaseGuestLayout from "../../layouts/_baseGuestLayout";
import Head from "next/head";
import CreateChart from "../../component/chart/CreateChart";

const ViewChart: NextPage = () => {

    return (
        <_BaseGuestLayout>
            <div className='flex flex-col justify-around h-full p-10'>
                <CreateChart />
            </div>
        </_BaseGuestLayout>
    )
}
export default ViewChart;