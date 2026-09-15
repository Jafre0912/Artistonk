import type { NewTicketPayload, Status, Ticket } from '../types/ticket.types'
import { mockTickets } from '../data/mockData'

const NETWORK_DELAY = 600

let db: Ticket[] = [...mockTickets]

function delay<T>(data: T, ms = NETWORK_DELAY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export async function fetchTicketsApi(): Promise<Ticket[]> {
  return delay([...db])
}

export async function updateTicketStatusApi(id: string, status: Status): Promise<Ticket> {
  const ticket = db.find((t) => t.id === id)
  if (!ticket) throw new Error('Ticket not found')
  ticket.status = status
  return delay({ ...ticket }, 300)
}

export async function createTicketApi(payload: NewTicketPayload): Promise<Ticket> {
  const newTicket: Ticket = {
    ...payload,
    id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
    messages: [],
  }
  db = [newTicket, ...db]
  return delay(newTicket, 400)
}

export async function deleteTicketApi(id: string): Promise<{ id: string }> {
  db = db.filter((t) => t.id !== id)
  return delay({ id }, 300)
}