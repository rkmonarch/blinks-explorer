import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useState } from "react";
import useUserStore from "@/store/user";
import Upload from "../ui/upload";

export default function UserProfileModal() {
  const { username, avatar, bio, first_name, last_name } = useUserStore();
  const [IfirstName, setFirstname] = useState("");
  const [IlastName, setLastName] = useState("");
  const [Ibio, setBio] = useState("");
  const [Iavatar, setAvatar] = useState("");
  const [Iusername, setUsername] = useState("");
  const [productImage, setProductImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const uploadProductImage = async (file: any) => {
    setIsImageUploading(true);
    const image = URL.createObjectURL(file);
    setProductImage(image);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("https://primebet-site.vercel.app/api/files", {
        method: "POST",
        body: formData,
      });
      const cid = await res.json();
      console.log(cid);
      setImageUrl(`https://gateway.pinata.cloud/ipfs/${cid.hash}`);
      setIsImageUploading(false);
    } catch (error) {
      console.log(error);
      setIsImageUploading(false);
    }
  };
  return (
    <section>
      <h4 className="font-semibold text-2xl text-center">Update Profile</h4>
      <Upload
        id="image"
        name="image"
        type="file"
        label="Upload Product"
        onChange={(e) => {
          e.preventDefault();
          if (e.target.files && e.target.files.length > 0) {
            uploadProductImage(e.target.files[0]);
          }
        }}
      />
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            First Name
          </Label>
          <Input
            onChange={(e) => setFirstname(e.target.value)}
            id="link"
            placeholder="Enter Blink URL"
            className="bg-secondary border border-border rounded-xl"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            Last Name
          </Label>
          <Input
            onChange={(e) => setLastName(e.target.value)}
            id="link"
            placeholder="Enter Blink URL"
            className="bg-secondary border border-border rounded-xl"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            username
          </Label>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            id="link"
            placeholder="Enter Blink URL"
            className="bg-secondary border border-border rounded-xl"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="link" className="text-sm font-medium mb-1">
            bio
          </Label>
          <Input
            onChange={(e) => setBio(e.target.value)}
            id="link"
            placeholder="Enter Blink URL"
            className="bg-secondary border border-border rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
