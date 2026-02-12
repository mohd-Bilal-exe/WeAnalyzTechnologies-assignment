import {
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleMinus,
  CirclePlus,
  Menu,
  Search,
  ClockAlert,
  SlidersHorizontal,
} from 'lucide-react';
import formatDate from '../../../lib/utils/dateFormattter';
import { motion } from 'motion/react';
import checkOverdue from '../../../lib/utils/isOverDue';
import { dummyUsers } from '../../../lib/store/tempData';
import type { Ticket } from '../../../lib/types/tickets';
import { useState } from 'react';
export default function MyTickets({
  tickets,
  selectedTicket,
  setSelectedTicket,
  setShowOptions,
}: {
  tickets: Ticket[];
  selectedTicket: string;
  setSelectedTicket: any;
  setShowOptions: any;
}) {
  const [hideMyTickets, setMyTickets] = useState(false);
  const handleToggle = () => {
    setShowOptions((prev: boolean) => !prev);
  };
  const handleshowTickets = () => {
    setMyTickets(!hideMyTickets);
    console.log(hideMyTickets);
  };
  const priorityIcon = {
    low: <CirclePlus className="size-5 text-yellow-600" />,
    mid: <CircleMinus className="size-5 text-green-800" />,
    high: <ClockAlert className="size-5 text-red-800" />,
  };
  return (
    <motion.div
      id="myTickets"
      initial={{ width: '22%' }}
      animate={{ width: hideMyTickets ? '4%' : '22%' }}
      className="relative bg-white border-slate-200 border-r rounded-tl-2xl max-w-1/5 overflow-hidden ticketShadow"
    >
      <motion.button
        animate={{ width: !hideMyTickets ? '4%' : '100%' }}
        onClick={handleshowTickets}
        className={`right-0 absolute flex justify-center items-center hover:bg-slate-200 transition-colors duration-200 w-2 h-full ${hideMyTickets ? 'bg-white items-start' : ''} z-150`}
      >
        {hideMyTickets && (
          <span className="bg-slate-400/20 mt-5 p-2 rounded-lg text-slate-400">
            <ChevronRight />
          </span>
        )}
        {!hideMyTickets && <div className="bg-amber-50 rounded-2xl w-1 h-4">{}</div>}
      </motion.button>
      <div className="flex justify-between items-center p-3">
        <button onClick={handleToggle} className="rounded-lg text-slate-500">
          <Menu className="size-5" />
        </button>
        <span className="flex justify-start items-centers gap-2 px-5 w-full font-semibold">
          <h1 className="">My Tickets</h1>
          <button>
            <ChevronDown className="size-4" />
          </button>
        </span>
        <button className="bg-slate-600/5 p-2 rounded-lg text-slate-500">
          <SlidersHorizontal className="size-5" />
        </button>
      </div>
      <div id="search" className="p-3 border-slate-200 border-y">
        <span className="flex justify-start items-center gap-3 bg-slate-600/5 p-2 px-4 border rounded-xl text-slate-500">
          <Search className="size-5" />
          <input placeholder="Search Tickets..." className="outline-0" />
        </span>
      </div>
      {tickets ? (
        <div className="flex flex-col max-w-full h-3/5 overflow-y-scroll">
          {tickets.map(ticket => (
            <button
              onClick={() => setSelectedTicket(ticket.id)}
              key={ticket.id}
              className={`relative flex flex-col gap-3 justify-between text-slate-500/50 items-start p-3  border-b border-slate-200 hover:bg-blue-500/10 transition-all duration-300 ${selectedTicket === ticket.id ? 'bg-blue-500/5' : 'transparent'}`}
            >
              {selectedTicket === ticket.id && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="top-0 left-0 absolute bg-blue-500 w-1 h-full"
                />
              )}
              <div id="titleDate" className="flex justify-between gap-1 w-full">
                <h1 className="font-semibold text-slate-800 truncate">{ticket.data.title}</h1>
                <span className="text-sm">{formatDate(ticket.createdAt)}</span>
              </div>
              <div id="checkboxStatus" className="flex justify-between w-full">
                <span id="checkbox" className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="bg-white size-4"
                    defaultChecked={ticket.status === 'done'}
                  />
                  <span className="ml-2 text-sm">{ticket.id}</span>
                </span>
                <span id="status" className="flex justify-center items-center gap-0.5">
                  {ticket.todoAttached.length > 0 &&
                  ticket.status !== 'done' && (
                    <button className="bg-green-200 px-2.5 py-0.5 rounded-2xl font-semibold text-green-700/80 text-xs">
                      Done
                    </button>
                  ) ? (
                    <button className="bg-blue-200 px-2.5 py-0.5 rounded-2xl font-semibold text-blue-700/80 text-xs">
                      Todo{' '}
                    </button>
                  ) : (
                    ticket.status === 'done' && (
                      <button className="bg-green-200 px-2.5 py-0.5 rounded-2xl font-semibold text-green-700/80 text-xs">
                        Done
                      </button>
                    )
                  )}
                  {checkOverdue(ticket.dueAt) && (
                    <button className="text-red-700/80">
                      <CircleAlert className="size-5" />
                    </button>
                  )}
                  <span>{priorityIcon[ticket.priority || 'mid']}</span>

                  {ticket.activeUsers.length > 0 && (
                    <span className="flex justify-center items-center gap-0.5">
                      <span className="bg-yellow-300 rounded-full size-5 overflow-hidden text-white text-xs">
                        <img src={dummyUsers[0].avatar} alt="" />
                      </span>
                      <span className="place-content-center grid bg-red-500 rounded-full size-5 text-white text-xs">
                        {ticket.activeUsers.length}
                      </span>
                    </span>
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <LoadingMyTickets />
      )}
    </motion.div>
  );
}

const LoadingMyTickets = () => {
  return (
    <div id="myTickets" className="min-w-1/5 min-h-full">
      <div className="flex flex-col gap-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="bg-slate-200 rounded-xl h-24 animate-pulse">
            <div className="flex flex-row justify-between p-4 h-full">
              <div className="flex flex-col justify-between gap-2">
                <div className="bg-slate-300 rounded-md w-24 h-6"></div>
                <div className="bg-slate-300 rounded-md w-16 h-4"></div>
              </div>

              <div className="flex gap-1">
                <div className="place-self-end bg-slate-300 rounded-full size-5"></div>
                <div className="place-self-end bg-slate-300 rounded-full size-5"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
