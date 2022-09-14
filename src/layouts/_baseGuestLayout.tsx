import { NextPage } from "next";
import { GuestFooter } from "../component/templates/GuestFooter";
import { GuestHeader } from "../component/templates/GuestHeader";
import _BaseLayout from "./_baselayout";

type Props = {
    children?: React.ReactNode;
};

const _BaseGuestLayout: NextPage<Props> = ({ children }: Props) => {
    return (
        <_BaseLayout>
            <div className='relative flex flex-col h-screen'>
                <div>
                    <GuestHeader />
                </div>
                <div className='grow'>
                    {children}
                </div>
                <div>
                    <GuestFooter />
                </div>
            </div>
        </_BaseLayout>
    )
}
export default _BaseGuestLayout;