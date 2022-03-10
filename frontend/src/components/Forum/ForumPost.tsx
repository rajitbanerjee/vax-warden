import { Heading, Box, Text, Badge, VStack, HStack } from "@chakra-ui/react";
import { formatDate } from "client/util";
import { User, UserRole } from "client/types";
import { FaReply } from "react-icons/fa";

interface PostProps {
  name: string;
  date: Date;
  content: string;
  user: User;
  reply: boolean;
}

const isToday = (someDate: Date): boolean => {
  const today: Date = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const ForumPost: React.FC<PostProps> = ({ name, date, content, user, reply }): JSX.Element => {
  return (
    <Box maxW="2xl" borderWidth="1px" borderRadius="lg" overflow="hidden" p={2} mb={2}>
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
