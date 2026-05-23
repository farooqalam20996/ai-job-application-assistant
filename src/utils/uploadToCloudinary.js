// uploadToCloudinary.js
export async function uploadToCloudinary(file) {
  console.log("**** File ***** ", file)
  if (!file) return null;

  const cloudName = "dradlgp35"; // replace with your cloudinary cloud name
  const uploadPreset = "resumes"; // replace with your unsigned preset

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await response.json();
  console.log("***** File URL ****** ", data.secure_url)
  return data.secure_url;
}
