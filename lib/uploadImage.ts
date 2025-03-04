import { supabase } from "./supabase";

export const uploadImage = async (file: File): Promise<{ url?: string; error?: string }> => {
  if (!file) return { error: "No file selected" };

  // const fileExt = file.name.split(".").pop();
  // const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${new Date().getTime()}.${file.name.split(".").pop()}`;

  // const filepath = `${new Date().getTime()}.${file.name.split(".").pop()}`

  const { error } = await supabase.storage
    .from("ozoneBucket") // Replace with your Supabase storage bucket name
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    // console.error("Upload error:", error.message);
    return { error: error.message };
  }

  // Get the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from("ozoneBucket")
    .getPublicUrl(filePath);

  return { url: urlData.publicUrl };
};