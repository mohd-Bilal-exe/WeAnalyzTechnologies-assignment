export interface Ticket {
  id: string;
  priority: TicketPriority;
  assignedTo: string;
  createdAt: Date;
  status: TicketStatus;
  dueAt: Date;
  todoAttached: string[];
  activeUsers: string[];
  data: TicketData;
}
export type TicketMessage = {
  userSender?: string;
  userReply?: string;
  text: string;
  time: Date;
  docs: Doc[];
};
export type Doc = {
  title: string;
  uploadedDate: Date;
};
export type TicketPriority = 'low' | 'mid' | 'high';
export type TicketStatus = 'open' | 'closed';
export type TicketFilter = {
  priority?: TicketPriority;
  status?: TicketStatus;
  assignedTo?: string;
  dueDate?: Date;
};
export type TicketData = {
  title: string;
  content: string;
  description: string;
  labels: string[];
  docs: Doc[];
  messages: TicketMessage[];
};
