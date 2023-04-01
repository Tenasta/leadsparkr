"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, Form, Formik, FormikErrors } from "formik";
import { AxiosResponse } from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import api from "@/lib/api";
import Button from "@/components/Button";
import { Form as FormEntity, NotificationPreference } from "@prisma/client";
import { useRouter } from "next/navigation";

type FormData = { [key: string]: any };
type FormCreateResponse = {
  success: boolean;
  errors: { [key: string]: string };
  data: FormEntity;
};

const validate = (values: FormData) => {
  let errors: FormikErrors<FormEntity> = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.emailForwardAddress) {
    errors.emailForwardAddress = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailForwardAddress)
  ) {
    errors.emailForwardAddress = "Invalid email address";
  }
  return errors;
};

const submit = (data: FormData): Promise<FormCreateResponse> => {
  return api.post("/forms", data).then((res: AxiosResponse) => res.data);
};

const NewFormPage = () => {
  const router = useRouter();
  const [formEntity, setFormEntity] = useState<FormEntity>();
  const initialValues: Partial<FormEntity> = {
    name: "",
    emailForwardAddress: "",
    botDetection: false,
    notificationPreference: NotificationPreference.WEEKLY,
  };

  return (
    <>
      <div>
        <Link href="/forms" passHref>
          <Button>
            <ArrowLeftIcon
              className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
              aria-hidden="true"
            ></ArrowLeftIcon>{" "}
            Back To Forms
          </Button>
        </Link>
      </div>
      {formEntity && (
        <div
          id="form-alert"
          className="p-4 my-2 bg-green-100 border text-green-800 rounded-lg"
        >
          <p>
            Success, your form was created!{" "}
            <Link href={"/forms/" + formEntity.id}>View Form</Link>
          </p>
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          submit(values).then((response) => {
            console.log(response);
            setSubmitting(false);
            if (response.success) {
              setFormEntity(response.data);
              resetForm();
            }
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h1 className="text-2xl leading-6 font-medium text-gray-900">
                    Manage Your Form
                  </h1>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Setup an endpoint to receive form submissions.
                  </p>
                </div>
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="form-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Form name{" "}
                      {errors.name && touched.name ? (
                        <span className="px-2 text-red-500">{errors.name}</span>
                      ) : null}
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        className={
                          "max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" +
                          (errors.name && touched.name
                            ? " bg-red-100 border-red-400"
                            : "")
                        }
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="form-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Email forward address{" "}
                      {errors.emailForwardAddress &&
                      touched.emailForwardAddress ? (
                        <span className="px-2 text-red-500">
                          {errors.emailForwardAddress}
                        </span>
                      ) : null}
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <Field
                        id="email_forward_address"
                        name="emailForwardAddress"
                        type="email"
                        className={
                          "max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" +
                          (errors.emailForwardAddress &&
                          touched.emailForwardAddress
                            ? " bg-red-100 border-red-400"
                            : "")
                        }
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="form-name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Enable bot detection
                    </label>
                    <div className="mt-2 flex items-center h-5 sm:col-span-2">
                      <Field
                        id="bot_detection"
                        name="bot_detection"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded "
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Notifications
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Customise when you want to receive notifications of form
                    submissions.
                  </p>
                </div>
                <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                  <div className="pt-6 sm:pt-5">
                    <div role="group" aria-labelledby="label-notifications">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                        <div>
                          <div
                            className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                            id="label-notifications"
                          >
                            Notification Frequency
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="max-w-lg">
                            <p className="text-sm text-gray-500">
                              These are delivered via email.
                            </p>
                            <div className="mt-4 space-y-4" role="group">
                              <div className="flex items-center">
                                <Field
                                  id="frequency-immediately"
                                  type="radio"
                                  name="notificationPreference"
                                  value="immediately"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label
                                  htmlFor="frequency-immediately"
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  Everything
                                </label>
                              </div>

                              <div className="flex items-center">
                                <Field
                                  id="frequency-daily"
                                  type="radio"
                                  name="notificationPreference"
                                  value="daily"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label
                                  htmlFor="frequency-daily"
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  Daily Summary
                                </label>
                              </div>

                              <div className="flex items-center">
                                <Field
                                  id="frequency-weekly"
                                  type="radio"
                                  name="notificationPreference"
                                  value="weekly"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label
                                  htmlFor="frequency-weekly"
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  Weekly Summary
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NewFormPage;
