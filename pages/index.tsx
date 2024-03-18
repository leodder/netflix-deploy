//小bug:當我自己在測試時要注意github跟google的email是同一個，但因為是抓email有沒有重複的關係，所以假如當曾經用
//github登入後，google的登入就會有問題，反之亦然

import {signOut, getSession} from 'next-auth/react';
//hooks
import useCurrentUser from '@/hooks/useCurrentUser';
import useMovieList from '@/hooks/useMovieList';
import useInfoModal from '@/hooks/useInfoModal';
//protect the home route
import { NextPageContext } from 'next';
//components
import Navbar from '@/components/navbar';
import Billboard from '@/components/billBoard';
import MovieList from '@/components/movieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/infoModal';


export async function getServerSideProps(context:NextPageContext) {
  const session = await getSession(context);

  if(!session){
    return{
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props:{}
  }
};

export default function Home() {
  // const {data: user} =  useCurrentUser();
  const { data:movies = []} = useMovieList();
  const { data: favorites= []} = useFavorites();
  const {isOpen,closeModal} = useInfoModal();

  return (
    <>
    {/* <h1 className="text-4xl text-green-500">Netflix Clone</h1>
    <p className='text-white'>Logged in as : {user?.name}</p>
    <p className='text-white'>Logged in as : {user?.email}</p>
    <button className='h-10 w-full bg-white' onClick={()=>signOut()}>Signout</button> */}
    <InfoModal visible={isOpen} onClose={closeModal} />
    <Navbar />
    <Billboard />
    <div className='pb-40'>
      <MovieList data={movies} title="Trending now" />
      <MovieList data={favorites} title="My List" />
    </div>
    </>
  );
}
