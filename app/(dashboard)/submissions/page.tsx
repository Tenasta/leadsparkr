"use client";
import Button from "@/components/Button";
import SubmissionsTable from "@/components/Submissions/SubmissionsTable";
import useAuth from "@/components/auth/hooks/use-auth";
import { fetcher } from "@/lib/api";
import useSWR from "swr";

const SubmissionsPage = () => {
  const { user, isInitialized, redirect } = useAuth();
  const { data, error, isLoading } = useSWR("/api/submissions", fetcher);

  if (!isInitialized) return <p>Loading...</p>;
  if (!user) return <p>Not logged in.</p>;
  if (error) return <div>Sorry, there was an error.</div>;

  return (
    <>
      <div className="flex justify-between">
        <h1>All Submissions</h1>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <SubmissionsTable
              data={data}
              isLoading={isLoading}
            ></SubmissionsTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionsPage;
