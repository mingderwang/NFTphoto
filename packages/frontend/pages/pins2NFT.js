import { useSession } from "next-auth/react";
import Pins2NFT from "../components/pins2NFT";

export default function Index(pageProps) {
  const { data: session, status } = useSession();

  return (
    <>
      {session && (
        <>
          <div>
            <Pins2NFT user_id={session}></Pins2NFT>
          </div>
        </>
      )}
    </>
  );
}
