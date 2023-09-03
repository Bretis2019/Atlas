import {useState} from "react";


function Spinner (){
    return (
        <div role="status">
            <svg aria-hidden="true"
                 className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"/>
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default function Landing(props){

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [haveaccount, setHaveaccount] = useState(true);
    const [loading, setLoading] = useState(false);

    async function signup(){
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": registerUsername,
            "password": registerPassword
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://atlasapi-4oe2.onrender.com/user/signup", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.message);
                setLoading(false);
                setHaveaccount(true);
            })
            .catch(error => console.log('error', error));
    }

    async function login(){
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": loginUsername,
            "password": loginPassword
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://atlasapi-4oe2.onrender.com/user/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(typeof(result.token) === "string") {
                    localStorage.setItem("token", result.token);
                    props.onPageChange("Dashboard");
                }setLoading(false);
            })
            .catch(error => console.log('error', error));
    }




    return (
        <div className={"bg-gray-100 overflow-hidden"}>
            <div className={"md:bg-[url('https://images.unsplash.com/photo-1592495989226-03f88104f8cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1824&q=80')] md:bg-[length:900px] bg-no-repeat bg-left h-[100svh] w-[100svw] overflow-hidden flex flex-row-reverse"}>
                    {haveaccount && <div className={"flex flex-col space-y-16 items-center justify-center bg-white h-[100svh] w-[100svw] md:w-[45svw] rounded-l-2xl shadow-2xl"}>
                        <div className={"flex flex-col items-center space-y-8"}>
                            <h1 className={"text-4xl"}>Login</h1>
                            <input className={"border-2 rounded-2xl border-dashed active:border-solid border-black px-4 py-2 text-gray-700"} type={"text"} placeholder={"username"} onChange={(e) => setLoginUsername(e.target.value)} value={loginUsername}/>
                            <input className={"border-2 rounded-2xl border-dashed active:border-solid border-black px-4 py-2 text-gray-700"} type={"password"} placeholder={"password"} onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword}/>
                            <button className={"border-2 rounded-2xl border-dashed hover:border-dotted active:border-solid border-black px-4 py-2 text-gray-700"} onClick={login}>{loading ? <Spinner />: "Login"}</button>
                        </div>
                        <div className="flex justify-center space-x-2">
                            <p>don't have an account ?</p>
                            <button className={"underline"} onClick={() => setHaveaccount(false)}>Register</button>
                        </div>
                    </div>}
                    {!haveaccount && <div className={"flex flex-col space-y-16 justify-center bg-white h-[100svh] w-[100svw] md:w-[45svw] rounded-l-2xl shadow-2xl"}>
                        <div className={"flex flex-col items-center space-y-8"}>
                            <h1 className={"text-4xl"}>Sign up</h1>
                            <input className={"border-2 rounded-2xl border-dashed active:border-solid border-black px-4 py-2 text-gray-700"} type={"text"} placeholder={"username"} onChange={(e) => setRegisterUsername(e.target.value)} value={registerUsername}/>
                            <input className={"border-2 rounded-2xl border-dashed active:border-solid border-black px-4 py-2 text-gray-700"} type={"password"} placeholder={"password"} onChange={(e) => setRegisterPassword(e.target.value)} value={registerPassword}/>
                            <button className={"border-2 rounded-2xl border-dashed hover:border-dotted active:border-solid border-black px-4 py-2 text-gray-700"} onClick={signup}>{loading ? <Spinner />: "Signup"}</button>
                        </div>
                        <div className="flex justify-center space-x-2">
                            <p>already have an account ?</p>
                            <button className={"underline"} onClick={() => setHaveaccount(true)}>Login</button>
                        </div>
                    </div>}
                </div>
        </div>
    );
}