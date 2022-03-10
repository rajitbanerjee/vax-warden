import { Box, Text, Badge } from "@chakra-ui/react";
import { formatDate } from "client/util";

interface PostProps {
  name: string;
  date: Date;
  content: string;
  reply: boolean;
}

const isToday = (someDate: Date): boolean => {
  const today: Date = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

export const ForumPost: React.FC<PostProps> = ({ name, date, content, reply }): JSX.Element => {
  const color = reply ? "lightgray" : "white";
  return (
    <Box maxW="2xl" borderWidth="1px" borderRadius="lg" overflow="hidden" p={2} mb={2} bg={color}>
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
