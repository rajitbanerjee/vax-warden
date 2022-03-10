import { Text, VStack, Divider, Textarea, HStack, Button, Container } from "@chakra-ui/react";
import * as forum from "client/forum";
import { formatDate } from "client/util";
import { Post, UserRole } from "client/types";
import { ForumPost } from "components";
import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import useAuth from "hooks/useAuth";
import { FaReply } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

const postEntries = (post: Post | undefined): [string, any][] => {
  if (!post) return [];
  return Object.entries(post);
};
export const Forum: React.FC = (): JSX.Element => {
  const { currentUser, jwtToken } = useAuth();
  const [posts, setPosts] = useState<Post | undefined>(undefined);
  let [message, setMessage] = useState<string | undefined>(undefined);

  const buttonHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (message) {
      forum.postMessage(message, jwtToken);
      setMessage("");
      window.location.reload();
    }
  };

  const textareaHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = event.target.value;
    setMessage(inputValue);
  };

  const fetchData = (token: string) => {
    forum.getPosts(token).then((newPosts) => setPosts(newPosts));
  };

  useEffect(() => {
    fetchData(jwtToken);
  }, [jwtToken]);

  return (
    <VStack spacing={5} pb="200px">
      <Container>
        {postEntries(posts).map(([_, post]) => (
          <VStack spacing={2} mb={2}>
            <Container>
              <ForumPost
                name={`${post.firstName} ${post.lastName}`}
                date={new Date(post.timestamp)}
                content={post.content}
                user={currentUser}
              />
              {currentUser.userRole === UserRole.ROLE_ADMIN && (
                <HStack spacing={1}>
                  <Textarea placeholder="Enter your reply here!" value={message} onChange={textareaHandler} />
                  <Button colorScheme="teal" variant="solid" onClick={buttonHandler} rightIcon={<FaReply />}>
                    Reply
                  </Button>
                </HStack>
              )}

              <Divider variant="dashed" />
            </Container>
          </VStack>
        ))}
        {currentUser.userRole === UserRole.ROLE_USER && (
          <HStack spacing={1}>
            <Textarea placeholder="Enter your question here!" value={message} onChange={textareaHandler} />
            <Button colorScheme="teal" variant="solid" onClick={buttonHandler} rightIcon={<AiOutlineSend />}>
              Submit
            </Button>
          </HStack>
        )}
      </Container>
    </VStack>
  );
};
