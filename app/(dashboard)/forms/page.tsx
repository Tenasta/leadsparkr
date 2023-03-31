"use client";
import Button from "@/components/Button";
import useAuth from "@/components/auth/hooks/use-auth";
import { fetcher } from "@/lib/api";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Form } from "@prisma/client";
import Link from "next/link";
import { Fragment } from "react";
import useSWR from "swr";

export default function FormsPage() {
  const { user, isInitialized, redirect } = useAuth();

  const { data, error, isLoading } = useSWR<Form[], any, any>(
    "/forms",
    fetcher
  );

  if (!isInitialized) return <p>Loading...</p>;
  if (!user) return <p>Not logged in.</p>;
  if (error) return <div>Sorry, there was an error.</div>;

  return (
    <>
      <div className="flex justify-between">
        <h1>Forms</h1>
        <Link href="/forms/create" passHref legacyBehavior>
          <Button>
            <Fragment>
              <PlusIcon
                className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                aria-hidden="true"
              ></PlusIcon>{" "}
              New Form
            </Fragment>
          </Button>
        </Link>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table
                id="forms-table"
                className="min-w-full divide-y divide-gray-300"
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Forwarding Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Endpoint
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {!data || !data.length ? (
                    <tr>
                      <td colSpan={5} className="text-center">
                        <p>
                          {isLoading
                            ? "Loading..."
                            : "There is nothing to show here..."}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    data.map((form) => (
                      <tr key={form.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {form.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {form.emailForwardAddress}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {form.endpoint}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href={"/forms/" + form.id}
                            className="view-form text-indigo-600 hover:text-indigo-900"
                          >
                            View<span className="sr-only">, {form.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
