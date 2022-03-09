import { Heading, Flex, Box, Text, Badge } from "@chakra-ui/react";
import { formatDate } from "client/util";
import { User } from "client/types";

interface PostProps {
  name: string;
  date: Date;
  content: string;
  user: User;
}

const isToday = (someDate: Date): boolean => {
  const today: Date = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const ForumPost: React.FC<PostProps> = ({ name, date, content, user }): JSX.Element => {
  return (
    <Box maxW="2xl" borderWidth="1px" borderRadius="lg" overflow="hidden" p={2}>
      <Box ml="3" p={2} borderRadius={5}>
        <Text fontWeight="bold">
          {name}
          {isToday(date) && (
            <Badge ml="1" colorScheme="green">
              New
            </Badge>
          )}
        </Text>
        <Text fontSize="sm">{formatDate(date)}</Text>
      </Box>
      <Text>{content}</Text>
    </Box>
  );
};
