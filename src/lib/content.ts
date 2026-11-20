import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { images } from "@/lib/ecu";

const fallbacks = [images.hero, images.girls, images.community, images.sports];
export const fallbackImg = (i: number) => fallbacks[i % fallbacks.length]!;

export const programsQuery = queryOptions({
  queryKey: ["programs"],
  queryFn: async () => (await supabase.from("programs").select("*").order("sort_order")).data ?? [],
});
export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: async () => (await supabase.from("projects").select("*, reports(*)").order("sort_order")).data ?? [],
});
export const reportsQuery = queryOptions({
  queryKey: ["reports"],
  queryFn: async () => (await supabase.from("reports").select("*").order("created_at", { ascending: false })).data ?? [],
});
export const postsQuery = queryOptions({
  queryKey: ["posts"],
  queryFn: async () => (await supabase.from("posts").select("*").order("created_at", { ascending: false })).data ?? [],
});

/** Uploads a file to storage and returns a long-lived link to it. */
export async function uploadFile(file: File, folder: string) {
  const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const up = await supabase.storage.from("media").upload(path, file);
  if (up.error) throw up.error;
  const signed = await supabase.storage.from("media").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (signed.error) throw signed.error;
  return signed.data.signedUrl;
}
