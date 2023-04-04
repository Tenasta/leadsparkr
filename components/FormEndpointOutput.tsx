"use client";
import {
  CheckCircleIcon,
  ClipboardDocumentIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Form } from "@prisma/client";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";

export default function FormEndpointOutput({ form }: { form: Form }) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const formEndpoint = `${process.env.NEXT_PUBLIC_FORM_ENDPOINT}/${form.endpoint}`;
  const exampleCurlPost = `curl -X POST ${formEndpoint} -H "Content-Type: application/x-www-form-urlencoded" -d "exampleField1=value1&exampleField2=value2"`;
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  return (
    <div>
      <CopyToClipboard text={formEndpoint} onCopy={() => setCopied(true)}>
        <div
          className="inline-block cursor-pointer relative bg-gray-100 rounded-md p-3"
          title="Click to copy"
        >
          <div className="absolute -right-7">
            {!copied && (
              <ClipboardDocumentIcon
                className={"h-5 w-5 font-bold text-gray-400"}
                aria-hidden="true"
              />
            )}
            {copied && (
              <CheckCircleIcon
                className={"h-5 w-5 font-bold text-green-300"}
                aria-hidden="true"
              />
            )}
          </div>
          <p>{formEndpoint}</p>
        </div>
      </CopyToClipboard>
      <Dialog>
        <DialogTrigger asChild>
          <button className="ml-12 rounded-md bg-indigo-800 bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <span className="flex gap-1 items-center">
              {/* <QuestionMarkCircleIcon className="h-4 w-5" /> */}
              See Example
            </span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col px-4">
            <h2 className="text-lg font-bold text-white mb-4">Example</h2>
            <p className="text-white mb-4">
              Copy the code below to your terminal and see it appear in the
              submissions table.
            </p>
            <div className="">
              <CopyToClipboard
                text={exampleCurlPost}
                onCopy={() => setCopied(true)}
              >
                <div
                  className="cursor-pointer relative bg-blue-100 rounded-md p-3 max-w-2xl"
                  title="Click to copy"
                >
                  <div className="absolute -right-7">
                    {!copied && (
                      <ClipboardDocumentIcon
                        className={"h-5 w-5 font-bold text-gray-400"}
                        aria-hidden="true"
                      />
                    )}
                    {copied && (
                      <CheckCircleIcon
                        className={"h-5 w-5 font-bold text-green-300"}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <pre className="break-words whitespace-pre-wrap">
                    {exampleCurlPost}
                  </pre>
                </div>
              </CopyToClipboard>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
