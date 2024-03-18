import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, useSession  } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext){

    // // 延迟等待时间（以毫秒为单位）
    // const delay = 3000; // 3 秒

    // // 使用 Promise 包装 setTimeout，以便稍后 await
    // const delayPromise = () => new Promise(resolve => setTimeout(resolve, delay));

    // // 等待一段时间
    // await delayPromise();

    const session = await getSession(context);

    if (session) {
        return {
          redirect: {
            destination: '/profiles',
            permanent: false,
          }
        }
      };

    if(!session){
        return {
            redirect:{
                destination:'/auth',
                permanent:false,
            }
        }
    }

    return {
        props:{}
    }
}

const Profiles = () => {

const router = useRouter();
const {data:currentUser} = useCurrentUser();

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-center text-white">Who is watching</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={()=>{router.push('/')}}>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="
                            w-44
                            h-44
                            rounded-md
                            flex
                            items-center
                            justify-center
                            border-2
                            border-transparent
                            group-hover:cursor-pointer
                            group-hover:border-white
                            overflow-hidden
                            ">
                                <img src="/images/default-blue.png" alt="Profile" />
                            </div>
                            <div className="
                            mt-4
                            text-gray-400
                            text-2xl
                            text-center
                            group-hover:text-white
                            ">
                                {currentUser?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profiles