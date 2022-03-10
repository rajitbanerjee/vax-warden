import { VStack, Text, Badge } from "@chakra-ui/react";
import { formatDate } from "client/util";

interface ForumPostProps {
  name: string;
  date: Date;
  content: string;
  isReply: boolean;
  width: number;
}

const isToday = (someDate: Date): boolean => {
  const today: Date = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

export const ForumPost: React.FC<ForumPostProps> = ({ name, date, content, isReply, width }): JSX.Element => {
  const color = isReply ? "lightgray" : "white";
  return (
    <VStack
      borderWidth="1px"
      borderRadius="lg"
      p={3}
      bg={color}
      width={width}
      align="left"
      maxH={width / 2}
      overflow="scroll"
      spacing={1}
    >
      <Text fontWeight="bold">
        {name}
        {isToday(date) && (
          <Badge ml="1" colorScheme="green">
            New
          </Badge>
        )}
      </Text>
      <Text fontSize="sm">{formatDate(date)}</Text>
      <Text pt={2}>{content}</Text>
    </VStack>
  );
};
