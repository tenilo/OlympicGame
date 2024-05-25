const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/Ticket/AllTickets",
      // `/api/Ticket/TicketById/${id}`,
      
    ],
    target: "https://localhost:7229",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
