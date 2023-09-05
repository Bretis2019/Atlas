import {create_payement} from 'chargily-epay-react-js'
import {useState} from "react";

export default function Wallet(){

    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [mode, setMode] = useState("");

    const handleClick = async()=>{

        const invoice = {
            "amount":amount,
            "invoice_number":23,
            "client":name, // add a text field to allow the user to enter his name, or get it from a context api (depends on the project architecture)
            "mode":mode,
            "webhook_url":"https://atlas.free.beeceptor.com", // here is the webhook url, use beecptor to easly see the post request and it's body, you will use this in backened to save and validate the transactions.
            "back_url":"http://localhost:3000/Atlas", // to where the user will be redirected after he finish/cancel the payement
            "discount" :0
        }
        try {
            await create_payement(invoice)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={"w-[100svw] h-[100svh] dark:text-white flex flex-col items-center justify-center border-t-2 border-l-2 border-white"}>
            <form className={"flex flex-col space-y-8 pb-8"}>
                <div className="flex flex-col space-y-2">
                    <label className={"text-3xl"}>Amount</label>
                    <input value={amount} onChange={event => setAmount(event.target.value)}  className={"text-black placeholder-gray-600 h-12"} type="number" name="amount" placeholder={0}/>
                </div>
                <div  className="flex flex-col space-y-2">
                    <label className={"text-3xl"}>Name</label>
                    <input value={name} onChange={event => setName(event.target.value)}  className={"text-black placeholder-gray-600 h-12"} type="text" name="name" placeholder={"name"}/>
                </div>
                <div className="flex flex-col space-y-2">
                    <label className={"text-3xl"}>Mode</label>
                    <select value={mode} onChange={event => setMode(event.target.value)} className={"text-black placeholder-gray-600 min-w-fit h-12"} name="mode" placeholder={"mode"}>
                        <option value="CIB">CIB</option>
                        <option value="DAHABIA">DAHABIA</option>
                    </select>
                </div>
            </form>
            <button className={"border-2 border-white px-4 py-2 text-xl rounded-xl md:hover:bg-gray-800"} onClick={handleClick}>Submit</button>
        </div>
    )
}