import { createClient } from "@/lib/supabase";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("dev_road_constructions").select();
  console.log(process.env.SUPABASE_URL);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
