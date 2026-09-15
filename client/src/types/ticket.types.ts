export type Priority = 'Low' | 'Medium' | 'High'
export type Status = 'Open' | 'In Progress' | 'Resolved'

export interface TicketMessage {
  id: string
  author: string
  role: 'customer' | 'agent'
  text: string
  timestamp: string
}

export interface Ticket {
  id: string
  customerName: string
  customerEmail: string
  subject: string
  description: string
  priority: Priority
  status: Status
  createdAt: string
  messages: TicketMessage[]
}

export type NewTicketPayload = Pick<
  Ticket,
  'customerName' | 'customerEmail' | 'subject' | 'description' | 'priority' | 'status'
>
