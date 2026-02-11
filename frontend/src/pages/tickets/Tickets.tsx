import { useEffect, useState } from 'react';
import { dummyTickets } from '../../lib/store/tempData';
import MyTickets from './components/MyTickets';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { Ticket } from '../../lib/types/tickets';
import checkOverdue from '../../lib/utils/isOverDue';
import SelectedTicket from './components/SelectedTicket';
export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>(dummyTickets);
  const [selectedTicket, setSelectedTicket] = useState(dummyTickets[0].id);
  const [ticketFilters, setTicketFilters] = useState({
    priority: 'all',
    status: 'all',
    assignee: 'all',
  });
  const [filteredValues, setFilteredValues] = useState({
    'My Tickets': 0,
    'Past Due': 0,
    'High Priority': 0,
    Unassigned: 0,
    'All Ticktes': 0,
  });
  const handleFilteration = (filterName: string) => {
    const filteredTickets = dummyTickets.filter(ticket => {
      if (filterName === 'Past Due')
        return ticket.status !== 'closed' && checkOverdue(ticket.dueAt);
      if (filterName === 'High Priority') return ticket.priority === 'high';
      if (filterName === 'Unassigned') return ticket.assignedTo === '';
      if (filterName === 'My Tickets') return ticket;
      return ticket.assignedTo.toLowerCase().includes(filterName.toLowerCase());
    });
    setTickets(filteredTickets);
    setTimeout(() => setShowOptions(false), 500);
  };
  const [showoptions, setShowOptions] = useState(false);

  const calculateValues = () => {
    const values = {
      'My Tickets': dummyTickets.length,
      'Past Due': dummyTickets.filter(t => t.status !== 'closed' && checkOverdue(t.dueAt)).length,
      'High Priority': dummyTickets.filter(t => t.priority === 'high').length,
      Unassigned: dummyTickets.filter(t => t.assignedTo === '').length,
      'All Ticktes': dummyTickets.length,
    };
    setFilteredValues(values);
  };
  useEffect(() => {
    if (tickets.length > 0) calculateValues();
  }, []);
  return (
    <div className="relative flex gap-0 min-h-full">
      <FilterTickets handleFilteration={handleFilteration} filteredValues={filteredValues} />
      <motion.div
        animate={{ x: showoptions ? '16svw' : 0 }}
        transition={{ duration: 0.3 }}
        className="z-10 flex w-full"
      >
        <MyTickets
          tickets={tickets}
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          setShowOptions={setShowOptions}
        />
        <SelectedTicket selectedTicket={tickets.find(t => t.id === selectedTicket)!} />
      </motion.div>
    </div>
  );
}
const FilterTickets = ({
  handleFilteration,
  filteredValues,
}: {
  handleFilteration?: (filter: string) => void;
  filteredValues: {
    'My Tickets': number;
    'Past Due': number;
    'High Priority': number;
    Unassigned: number;
    'All Ticktes': number;
  };
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('My Tickets');
  const filterOPtions = ['My Tickets', 'Past Due', 'High Priority', 'Unassigned', 'All Ticktes'];
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    handleFilteration && handleFilteration(filter);
  };
  return (
    <div className="top-0 left-0 z-0 absolute bg-slate-600/10 p-3 py-10 border-slate-200 border-r rounded-tl-2xl w-[18svw] min-h-full">
      <button className="flex justify-start items-center bg-slate-500/20 px-3 py-2 rounded-md w-4/5 text-slate-700 text-sm">
        <span className="pr-3">
          <ChevronDown className="size-4" />
        </span>
        <span>Tickets Views</span>
      </button>
      <div className="flex flex-col gap-2 mt-4 w-4/5">
        {filterOPtions.map(option => {
          return (
            <button
              onClick={() => handleFilterSelect(option)}
              className={`flex justify-between items-center ${selectedFilter === option ? 'bg-blue-500 text-white/90 shadow-md shadow-blue-500/20' : 'bg-transparent text-blue-950'} p-2 px-3 w-full text-sm cursor-pointer rounded-lg font-semibold transition-colors duration-300 `}
            >
              <span>{option}</span>
              <span>{filteredValues[option as keyof typeof filteredValues]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
