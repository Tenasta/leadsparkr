"use client";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

const SubmissionData = ({ data }: { data: any }) => {
  if (!data) return <p>There is no submission data.</p>;
  return <JSONPretty id="json-pretty" data={data}></JSONPretty>;
};

export default SubmissionData;
