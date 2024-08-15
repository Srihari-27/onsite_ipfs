


import {create,globSource} from 'ipfs-http-client';
import fs from 'fs';
async function ipfsClient() {
    const ipfs = await create(
        {
            url:"/ip4/127.0.0.1/tcp/5001",
        
        }
    );
    return ipfs;
}
async function saveFile() {

    let ipfs = await ipfsClient();

    
    let data = fs.readFileSync("ipfsfile.txt")
    let options = {
        warpWithDirectory: false,
        progress: (prog) => console.log(`Saved :${prog}`)
    }
    let result = await ipfs.add(data, options);
    console.log(result)
}
//saveFile()

async function getData(hash) {
    let ipfs = await ipfsClient();

    let asyncitr = ipfs.cat(hash)

    for await (const itr of asyncitr) {

        let data = Buffer.from(itr).toString()
        console.log(data)
    }
}
getData(`QmbPYMVLHb4bgKvXJ7PsXbZwhopYFjSRHnVdJ5pEZNf7R6`);
