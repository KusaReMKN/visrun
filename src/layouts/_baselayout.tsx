import { NextPage } from 'next';

type Props = {
    children?: React.ReactNode;
};

const _BaseLayout: NextPage<Props> = ({ children }: Props) => {
    return (
        <>
            {children}
        </>
    )
}
export default _BaseLayout;