export default function checkOverdue(dueDate: Date) {
  const currentDate = new Date();
  return currentDate > dueDate;
}
