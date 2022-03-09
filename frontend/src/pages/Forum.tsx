import { Text, VStack } from "@chakra-ui/react";
import * as forum from "client/forum";
import { formatDate } from "client/util";
import { Post } from "client/types";
import { ForumPost } from "components";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";

export const Forum: React.FC = (): JSX.Element => {
  const { currentUser, jwtToken } = useAuth();
  const [posts, setPosts] = useState<Post | undefined>(undefined);

  const fetchData = (token: string) => {
    forum.getPosts(token).then((newPosts) => setPosts(newPosts));
  };

  useEffect(() => {
    fetchData(jwtToken);
  }, [jwtToken]);

  return (
    <VStack spacing={5} pb="200px">
      <Text>{JSON.stringify(posts)}</Text>
      <ForumPost
        name={`${currentUser.firstName} ${currentUser.lastName}`}
        date={new Date()}
        content="Lions dont even like water. If you placed it near a river, or some sort of fresh water source, thatd make sense. But you find yourself in the ocean, a 20 ft wave, Im assuming its off the coast of South Africa, coming up against a full, grown, 800 lb tuna with his 20 or 30 friends. You lose that battle. you lose that battle nine times out of ten. And guess what, you wandered into our school, of tuna and we now have a taste of blood! Weve talked, to ourselves. Weve communicated and said, you know what? lion tastes good. Lets go get some more lion. Weve developed a system, to establish a beachhead and aggressively hunt you and your family. And we will corner your, your pride, your children, your offspring..."
        user={currentUser}
      />
    </VStack>
  );
};
