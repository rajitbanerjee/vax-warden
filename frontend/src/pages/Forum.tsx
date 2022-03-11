import { Button, Divider, Heading, HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import * as forum from "client/forum";
import { OrganisedPosts, Post } from "client/types";
import { ForumPost } from "components";
import useAuth from "hooks/useAuth";
import useWindowDimensions from "hooks/useWindowDimensions";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FaReply } from "react-icons/fa";

const getOrganisedPosts = (posts: Post[]): { post: Post; replies: Post[] }[] => {
  const organised: OrganisedPosts = {};
  const originalPosts = posts.filter((post) => !post.replyToPostId);
  const replies = posts.filter((post) => post.replyToPostId);

  originalPosts.forEach((post) => {
    organised[post.id] = {
      post,
      replies: [],
    };
  });
  replies.forEach((post) => organised[post.replyToPostId!].replies.push(post));
  return Object.values(organised);
};

export const Forum: React.FC = (): JSX.Element => {
  const { jwtToken, isAdmin } = useAuth();
  const { width } = useWindowDimensions();
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [postMessage, setPostMessage] = useState<string>("");
  const [replyMessages, setReplyMessages] = useState<{ [key: number]: string } | null>();
  const [countPosts, setCountPosts] = useState<number>(0);

  const buttonHandlerUser = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (postMessage) {
      forum.createPost(postMessage, jwtToken).then(() => setCountPosts(countPosts + 1));
      setPostMessage("");
    }
  };

  const buttonHandlerAdmin = (event: MouseEvent<HTMLButtonElement>, replyToPostId: number) => {
    event.preventDefault();
    if (replyMessages && replyMessages[replyToPostId]) {
      forum
        .createReply(replyMessages[replyToPostId], replyToPostId, jwtToken)
        .then(() => setCountPosts(countPosts + 1));
      setReplyMessages(null);
    }
  };

  const postMessageHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const messageInput = event.target.value;
    setPostMessage(messageInput);
  };

  const replyMessagesHandler = (event: ChangeEvent<HTMLTextAreaElement>, replyToPostId: number) => {
    const replyMessageInput = event.target.value;
    setReplyMessages((prevState) => ({
      ...prevState,
      [replyToPostId]: replyMessageInput,
    }));
  };

  const fetchData = (token: string) => {
    forum.listPosts(token).then((newPosts) => {
      setPosts(newPosts);
      newPosts.forEach((p) =>
        setReplyMessages((prevState) => ({
          ...prevState,
          [p.id]: "",
        }))
      );
    });
  };

  useEffect(() => {
    fetchData(jwtToken);
  }, [jwtToken, countPosts]);

  return (
    <VStack spacing={10} pb="200px">
      <Heading size="md" textAlign="center">
        Forum
      </Heading>
      {posts && posts.length > 0 ? (
        getOrganisedPosts(posts).map(({ post, replies }, i) => (
          <VStack spacing={2} mb={2} key={i.toString()}>
            <ForumPost
              name={`${post.firstName} ${post.lastName}`}
              date={new Date(post.timestamp)}
              content={post.content}
              isReply={false}
              width={width / 3}
            />
            {replies.map((reply, j) => (
              <ForumPost
                key={j.toString()}
                name={`${reply.firstName} ${reply.lastName}`}
                date={new Date(reply.timestamp)}
                content={reply.content}
                isReply={true}
                width={width / 3}
              />
            ))}
            {isAdmin && (
              <HStack spacing={1} width={width / 3}>
                <Textarea
                  placeholder="Enter your reply here!"
                  value={replyMessages ? replyMessages[post.id] : ""}
                  onChange={(event) => replyMessagesHandler(event, post.id)}
                />
                <Button
                  colorScheme="teal"
                  variant="solid"
                  onClick={(event) => buttonHandlerAdmin(event, post.id)}
                  rightIcon={<FaReply />}
                  disabled={replyMessages ? !replyMessages[post.id] : true}
                >
                  Reply
                </Button>
              </HStack>
            )}
            <Divider />
          </VStack>
        ))
      ) : isAdmin ? (
        <Text>No posts yet!</Text>
      ) : (
        <></>
      )}
      {!isAdmin && (
        <HStack spacing={1} width={width / 3}>
          <Textarea placeholder="Enter your question here!" value={postMessage} onChange={postMessageHandler} />
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={buttonHandlerUser}
            disabled={!postMessage}
            rightIcon={<AiOutlineSend />}
          >
            Submit
          </Button>
        </HStack>
      )}
    </VStack>
  );
};
