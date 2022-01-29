import useSWR from "swr";
import { useSession } from "next-auth/react";
import Pins from "../components/pins";

export default function Index(pageProps) {
  const { data: session, status } = useSession();

  return (
    <>
      {session && (
        <>
          <div>
            <Pins user_id={session}></Pins>
          </div>
        </>
      )}
    </>
  );
}
