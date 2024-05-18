export const differenceBetweenDates = (start: Date, end: Date) => {
  return (end.getTime() - start.getTime());
};

export const getTimeOut = (time: Date, timeOutSeconds: number) => {
  const timesMills = differenceBetweenDates(time, new Date());
  return Math.round(timeOutSeconds - timesMills / 1000);
};

export const generateCode = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};
