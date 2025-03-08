import Feed from "../feed";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import useRequest from "@/hooks/useRequest";

import Container from "@/components/container";
import { LoadingScreen } from "@/components/loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { User } from "@/types/user";

const Profile = () => {
  const { usernameParam } = useParams();
  const [profileData, setProfileData] = useState<null | User>(null);
  const username = useSelector((state: RootState) => state.auth.username);
  const { data, loading, error, makeRequest } = useRequest(
    `/profiles/profile/${usernameParam || username || ""}`
  );

  useEffect(() => {
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
              <div>
                <Avatar variant={"2xl"} img="https://i.pravatar.cc/150?img=5" />
              </div>
              <div>
                <p className="font-semibold text-xl flex flex-col lg:flex-row gap-1">
                  <span>
                    {profileData.firstName + " " + profileData.lastName}
                  </span>
                  <span className="text-neutral-500 font-light hidden lg:block">
                    /
                  </span>
                  <span className="text-neutral-500 font-light">
                    @{profileData.username}
                  </span>
                </p>
                <span>{profileData.bio}</span>
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
