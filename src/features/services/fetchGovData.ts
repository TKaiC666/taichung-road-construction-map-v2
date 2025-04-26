import { GovRoadConstruction } from "@/types";

export async function fetchGovData(): Promise<GovRoadConstruction[]> {
  const url = process.env.GOV_API_URL;

  if (!url) {
    throw new Error("GOV_API_URL is not defined in environment variables");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const message = (await response.json()).message || response.statusText;
      console.error(
        `[fetchGovData] Request failed: ${response.status} ${response.statusText}`
      );
      throw new Error(message);
    }

    const data = await response.json();
    console.info(
      `[fetchGovData] Fetched ${
        Array.isArray(data) ? data.length : "unknown"
      } records`
    );
    return data as GovRoadConstruction[];
  } catch (err) {
    console.error("[fetchGovData] Unexpected error:", err);
    throw err;
  }
}
