import { Submission } from "@prisma/client";
import SubmissionData from "./SubmissionData";

const FormSubmissionsTable = ({
  data,
  isLoading = false,
}: {
  data: Submission[];
  isLoading?: boolean;
}) => {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table
        id="submissions-table"
        className="min-w-full divide-y divide-gray-300"
      >
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Data
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              User IP Address
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Date
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">View</span>
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
            data.map((submission) => (
              <tr key={submission.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {submission.data && (
                    <SubmissionData data={submission.data}></SubmissionData>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {submission.user_ip}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {submission.createdAt.toDateString()}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a
                    href={"/submissions/" + submission.id}
                    className="view-submission text-indigo-600 hover:text-indigo-900"
                  >
                    View submission
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FormSubmissionsTable;
