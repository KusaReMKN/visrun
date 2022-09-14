import { NextApiRequest, NextApiResponse } from "next";

let syncing = false;
//まだまだこれからまつんががあくよ


function lazymain() {
    return new Promise<void>(r => setTimeout(() => r(), 6000));
}

async function matu() {
    if (!syncing) {
        syncing = true;
        await lazymain();
        syncing = false;
        console.log("lazy");
    } else {
        console.log('liksdafj;lfkdjsal;kjf;lsakjdf;lakj');
    }

}


const matunga = (req: NextApiRequest, res: NextApiResponse) => {

    res.json(syncing ? '同期中' : '同期開始');
    res.end();
    matu();
}
export default matunga;