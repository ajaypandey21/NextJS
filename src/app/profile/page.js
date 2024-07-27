"use client";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {session && session?.user ? (
        <Profile
          name="My"
          desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
          data={myPosts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <h1 className="text-3xl font-bold text-red-600 bg-white p-4 rounded-lg shadow-md border border-red-300">
          Please log in
        </h1>
      )}
    </>
  );
};

export default MyProfile;
