import Button from "@/components/Button";
import FormEndpointOutput from "@/components/FormEndpointOutput";
import RealtimeSubmissions from "@/components/Submissions/RealtimeSubmissions";
import { fetcher } from "@/lib/api";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Form, Submission } from "@prisma/client";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function ViewFormPage({
  params,
}: {
  params: { id: string };
}) {
  const apiConfig = {
    headers: {
      "x-session-token": cookies().get("stytch_session")?.value || "",
    },
  };
  // todo since this is a server component we can interact with the database directly
  // this will reduce the amount of internal function invocations
  const form: Form = await fetcher(`/forms/${params.id}`, apiConfig).catch(
    (err) => console.error("error fetching")
  );
  const submissions: Submission[] = await fetcher(
    `/submissions?formId=${params.id}`,
    apiConfig
  ).catch((err) => console.error("error fetching"));
  if (!form) return <p>Form not found.</p>;
  const error = "";
  return (
    <>
      <div>
        <Link href="/forms" passHref legacyBehavior>
          <Button>
            <ArrowLeftIcon
              className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
              aria-hidden="true"
            ></ArrowLeftIcon>{" "}
            Back To Forms
          </Button>
        </Link>
      </div>
      <div>
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h1 className="text-2xl leading-6 font-medium text-gray-900">
                View Your Form: {form.name}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This enables an endpoint to receive form submissions.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Form Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {form.name}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email Forward Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {form.emailForwardAddress}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Bot detection
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex-shrink-0">
                    {form.botDetection && (
                      <CheckCircleIcon
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                    )}
                    {!form.botDetection && (
                      <XCircleIcon
                        className="h-5 w-5 text-red-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </dd>
              </div>

              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Endpoint</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <FormEndpointOutput form={form} />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div>
          <h2>Form Submissions</h2>
          <div className="pt-8">
            {submissions && error}
            {submissions && (
              <RealtimeSubmissions data={submissions} />
              // <FormSubmissionsTable data={submissions}></FormSubmissionsTable>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
