import { Text, VStack } from "@chakra-ui/react";
import * as forum from "client/forum";
import { formatDate } from "client/util";
import { Post } from "client/types";
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
    </VStack>
  );
};
