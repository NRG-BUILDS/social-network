import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import useRequest from "@/hooks/useRequest";
import { User } from "@/types/user";
import { useLayoutEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  showEditModal: boolean;
  onOpenChange: (bool: boolean) => void;
  profileData: User;
};
export const EditProfile = ({
  showEditModal,
  onOpenChange,
  profileData,
}: Props) => {
  const { loading, makeRequest } = useRequest("/profiles/profile");
  const [form, setForm] = useState<User | null>(null);

  useLayoutEffect(() => {
    if (profileData) {
      setForm({ ...profileData });
    }
  }, []);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    if (value.trim()) {
      //@ts-ignore
      setForm({ ...form, [name]: value });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await makeRequest(form, "PATCH");
    if (res.status === "success") {
      toast.success("Changes to profile have been saved");
    }
  };
  return (
    <Modal
      isOpen={showEditModal}
      onOpenChange={onOpenChange}
      title="Edit Profile"
      useDrawerOnMobile
    >
      <form onSubmit={handleSubmit}>
        {form && (
          <div className="grid gap-4 lg:grid-cols-2 my-6">
            <label htmlFor="firstName">
              <span className="block py-1 font-medium">First Name</span>
              <input
                type="text"
                value={form.firstName}
                name="firstName"
                onChange={handleInput}
                className="w-full border p-2 rounded-lg focus:border-brand-primary"
              />
            </label>
            <label htmlFor="lastName">
              <span className="block py-1 font-medium">Last Name</span>
              <input
                type="text"
                value={form.lastName}
                name="lastName"
                onChange={handleInput}
                className="w-full border p-2 rounded-lg focus:border-brand-primary"
              />
            </label>
            <label htmlFor="bio">
              <span className="block py-1 font-medium">Bio</span>
              <textarea
                rows={5}
                value={form.bio || ""}
                name="bio"
                onChange={handleInput}
                className="w-full border p-2 rounded-lg focus:border-brand-primary"
              />
            </label>
            <div className="lg:col-span-2 my-2 w-full flex justify-end">
              <Button className="rounded" variant={"outline"} loading={loading}>
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};
