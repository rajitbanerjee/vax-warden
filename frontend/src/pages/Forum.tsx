import { Text, VStack } from "@chakra-ui/react";
import * as forum from "client/forum";
import { formatDate } from "client/util";
import { Post } from "client/types";
import { ForumPost } from "components";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";

const postEntries = (post: Post | undefined): [string, any][] => {
  if (!post) return [];
  return Object.entries(post);
};
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
      {postEntries(posts).map(([_, post]) => (
        <ForumPost
          name={`${post.firstName} ${post.lastName}`}
          date={new Date(post.timestamp)}
          content={post.content}
          user={currentUser}
        />
      ))}
    </VStack>
  );
};
