import Feed from "../feed";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { FiCamera, FiEdit3, FiPlus } from "react-icons/fi";
import useRequest from "@/hooks/useRequest";

import Container from "@/components/container";
import { LoadingScreen } from "@/components/loader";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { User } from "@/types/user";
import { EditProfile } from "./edit-profile";
import { uploadImage } from "@/lib/imageUpload";

const Profile = () => {
  const { usernameParam } = useParams();
  const [profileData, setProfileData] = useState<null | User>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const username = useSelector((state: RootState) => state.auth.username);
  const { data, loading, error, makeRequest } = useRequest(
    `/profiles/profile/${usernameParam || username || ""}`
  );
  const { makeRequest: avatarChangeRequest } = useRequest(`/profiles/profile`);
  const nav = useNavigate();

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      return;
    }
    avatarChangeRequest({ fileType: "image/png" }, "PATCH").then((res) => {
      if (res.status === "success") {
        const { publicId, signature, timestamp } = res.data.fileUploadData;
        uploadImage(files[0], publicId, signature, timestamp);
      }
    });
  };
  useLayoutEffect(() => {
    if (username === usernameParam) {
      nav("/profile");
      return;
    }
    makeRequest();
  }, []);
  useEffect(() => {
    if (data) {
      setProfileData(data.data);
    }
  }, [data]);
  if (loading || error) {
    return <LoadingScreen loading={loading} error={error} />;
  }
  if (profileData)
    return (
      <div className="rounded-lg md:col-span-8">
        <div className="bg-white rounded-lg border">
          <Container className="flex flex-col lg:flex-row text-center lg:text-left py-20 items-center justify-center gap-y-10 lg:justify-between">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="relative size-fit">
                <Avatar variant={"2xl"} img={profileData.avatarUrl} />
                <label htmlFor="avatarInput" className=" size-fit block">
                  <span className="absolute bottom-0 right-0 bg-white text-brand-primary p-1 rounded-full shadow-xl active:bg-brand-primary active:text-white">
                    <FiCamera />
                  </span>
                  <input
                    type="file"
                    name="avatarInput"
                    id="avatarInput"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
              <div>
                <p className="font-semibold text-xl space-y-0.5">
                  <span className="flex items-center justify-center gap-1.5">
                    <span>
                      {profileData.firstName + " " + profileData.lastName}
                    </span>
                    {!usernameParam && (
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="text-brand-primary p-1 rounded-lg shadow-xl active:bg-brand-primary active:text-white"
                      >
                        <FiEdit3 />
                      </button>
                    )}
                    {showEditModal && (
                      <EditProfile
                        showEditModal={showEditModal}
                        onOpenChange={setShowEditModal}
                        profileData={profileData}
                      />
                    )}
                  </span>
                  <p>
                    <span className="text-neutral-500 font-light">
                      @{profileData.username}
                    </span>
                  </p>
                </p>
                <span className="lg:hidden block mt-4">{profileData.bio}</span>
              </div>
            </div>
            <div className="flex items-center gap-[28px]">
              <div className="space-y-1 text-center">
                <span className="block text-xl font-bold">3k</span>
                <span className="block text-sm">Posts</span>
              </div>
              <div className="space-y-1 text-center">
                <span className="block text-xl font-bold">123k</span>
                <span className="block text-sm">Followers</span>
              </div>
              <div className="space-y-1 text-center">
                <span className="block text-xl font-bold">64</span>
                <span className="block text-sm">Following</span>
              </div>
            </div>
          </Container>
          <div className="px-4 lg:px-5 pb-4 hidden lg:block">
            <p>{profileData.bio}</p>
          </div>
          <div className="border-t flex justify-center lg:justify-start">
            <button className="p-4 px-6 border-b-4 border-brand-primary">
              Posts
            </button>
            <button className="p-4 px-6  border-brand-primary">Friends</button>
          </div>
        </div>
        <div className="grid lg:grid-cols-5 items-start gap-4 my-4">
          <div className="lg:col-span-3">
            <Feed />
          </div>
          {/* SUGGESTED FRIENDS */}
          <div className="sticky top-2 block bg-white border rounded-lg lg:col-span-2">
            <div className="p-5">
              <h5 className="font-medium">Suggested Friends</h5>
            </div>
            <div className="p-5 border-t">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <Avatar
                    variant={"lg"}
                    role="Financial Analyst"
                    name="Olivia Anderson"
                  />
                  <Button
                    variant={"secondary"}
                    className="bg-brand-primary/10 text-neutral-900 size-[32px] flex items-center justify-center"
                  >
                    <FiPlus />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;
