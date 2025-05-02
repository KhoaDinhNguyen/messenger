import { getDate } from "../dateConfigs/format";

function getMessageByDates(messages) {
  if (messages.length == 0) {
    return [];
  }

  let currentDate = "";
  let currentIdx = -1;
  const messagesFilterByDates = [];

  for (const message of messages) {
    const formatDate = getDate(new Date(Number(message.createdAt)));
    if (formatDate === currentDate) {
      messagesFilterByDates[currentIdx].messages.push(message);
    } else {
      currentDate = formatDate;
      messagesFilterByDates.push({
        date: formatDate,
        messages: [message],
      });
      currentIdx++;
    }
  }

  return messagesFilterByDates;
}

export { getMessageByDates };
