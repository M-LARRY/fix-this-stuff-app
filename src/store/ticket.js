import { defineStore } from 'pinia'
import ticketApi from '../api/ticket'

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    tickets: [],
    currentTicket: null,
    }),
  getters: {
    getTickets: (state) => state.tickets,
    getCurrentTicket: (state) => state.currentTicket,
  },
  actions: {
    // VALERIO: cannot test since the create ticket route is not allowing creation (broken internal comm) 
    async createTicket(data) {
      // const response = await ticketApi.post('/', data)
      const id = Object.keys(this.tickets).length
      var new_ticket = data
      new_ticket["id"] = id
      this.tickets.push(new_ticket)
      this.currentTicket = new_ticket
    },
    async fetchAllTickets() {
      // const response = await ticketApi.get('/') 
      // VALERIO: returning fake ticket list. When API works, change with response.data.tickets
      this.tickets = [
        {"id": 0, "title": "fix this", "description": "fix fix fix", "priority": "low", "category": 0},
        {"id": 1, "title": "fix this", "description": "fix fix fix", "priority": "low", "category": 0},
        {"id": 2, "title": "fix this", "description": "fix fix fix", "priority": "low", "category": 0},
      ]
    },
    async fetchTicketByID(ticketId) {
      //const response = await ticketApi.get('/${ticketId}')
      for (var ticket of this.tickets){
        if (ticket.id == ticketId) {
          this.currentTicket = ticket
          break
        }
      }
    },
    async updateTicket() {

    },
    async deleteTicket() {

    },
  },
})