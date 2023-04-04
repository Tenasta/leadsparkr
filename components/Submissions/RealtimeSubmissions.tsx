"use client";

import { createClient } from "@supabase/supabase-js";
import FormSubmissionsTable, {
  FormSubmissionsTableProps,
} from "./FormSubmissionsTable";
import { useEffect, useState } from "react";
import { Submission } from "@prisma/client";

export default function RealtimeSubmissions(props: FormSubmissionsTableProps) {
  const { data, ...rest } = props;
  const [submissions, setSubmissions] = useState(data);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  useEffect(() => {
    const channel = supabase
      .channel("submissions:*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "submissions" },
        (payload) => {
          const renameKeys = ["created_at", "updated_at", "form_id"]; // temporary hack for different casing on data keys :/
          const newSubmission = Object.fromEntries(
            Object.entries(payload.new as Submission).map(([key, val]) => [
              renameKeys.includes(key)
                ? key.replace(/_(.)/g, (g) => g[1].toUpperCase())
                : key,
              val,
            ])
          );
          setSubmissions([...submissions, newSubmission as Submission]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return <FormSubmissionsTable {...rest} data={submissions} />;
}
