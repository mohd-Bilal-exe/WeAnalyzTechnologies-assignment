export interface Ticket {
  id: string;
  priority: TicketPriority;
  assignedTo: string;
  createdAt: Date;
  status: TicketStatus;
  dueAt: Date;
  todoAttached: ToDo[];
  activeUsers: string[];
  data: TicketData;
  type: TicketType;
}
export type TicketMessage = {
  userSender?: string;
  userReply?: string[];
  text: string;
  time: Date | null;
  docs: Doc[];
};
export type Doc = {
  title: string;
  uploadedDate: Date;
};
export type TicketPriority = 'low' | 'mid' | 'high';
export type TicketStatus = 'done' | 'inProgress' | 'needReview' | 'todo';
export type TicketFilter = {
  priority?: TicketPriority;
  status?: TicketStatus;
  assignedTo?: string;
  dueDate?: Date;
};
export type TicketType = 'bug' | 'feature' | 'task';
export type TicketData = {
  title: string;
  content: string;
  description: string;
  labels: string[];
  docs: Doc[];
  messages: TicketMessage[];
};
export type ToDo = {
  todo: string;
  addedBy: string; //id
  isDone: boolean;
  priority: TicketPriority;
  dueDate: Date;
  reporter: string; //id
};
