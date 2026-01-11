import { createClient } from "@supabase/supabase-js";

// SERVER ONLY
const supabaseAdmin = createClient(
    "https://zbvyrbemefkmquyqbids.supabase.co", "sb_secret_tcdZsjq2hUwJbT_vk_xdqw_YbeRnU-R"
);

const bucketName = "1st-choice-properties-images";
const folderPath = "2-BEDROOM-FLATS";

export async function logAllSupabaseUrls() {
  try {
    const { data: files, error } = await supabaseAdmin.storage
      .from(bucketName)
      .list(folderPath);

    console.log(files); 
    if (error) {
      console.error("Error listing files:", error.message);
      return;
    }

    if (!files?.length) {
      console.log("No files found in folder:", folderPath);
      return;
    }

    const urls = files
      .filter((file) => file.name) // avoid folders
      .map((file) => {
        const { data } = supabaseAdmin.storage
          .from(bucketName)
          .getPublicUrl(`${folderPath}/${file.name}`);

        return data.publicUrl;
      });

    console.log("Public URLs:");
    console.log(urls.join(", "));
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}
