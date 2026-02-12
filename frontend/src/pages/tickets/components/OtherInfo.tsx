import {
  ChevronDown,
  X,
  Plus,
  ChevronRight,
  CirclePlus,
  CircleMinus,
  ClockAlert,
  Bug,
  ClipboardCheck,
  Binary,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import type { Ticket, TicketPriority, TicketStatus, TicketType } from '../../../lib/types/tickets';
import getUser from '../../../lib/utils/getUser';
import useZustand from '../../../lib/store/zustand';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
export default function OtherInfo({ ticket }: { ticket: Ticket }) {
  const { user } = useZustand();
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const [selectedAssignee, setSelectedAssignee] = useState<string>(ticket.assignedTo || 'u1');
  const [selectedType, setSelectedType] = useState<TicketType>(ticket.type);
  const [selectedReporter, setSelectedReporter] = useState<string>(user?.id || 'u1');
  const [selectedPriority, setSelectedPriority] = useState<TicketPriority>(ticket.priority);
  const [dueDate, setDueDate] = useState<string>(
    ticket.dueAt ? new Date(ticket.dueAt).toISOString().split('T')[0] : ''
  );
  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const handleFieldUpdate = (
    field: 'assignee' | 'type' | 'reporter' | 'dueDate' | 'priority' | 'status',
    value: string
  ) => {
    const updateFunction = {
      assignee: () => setSelectedAssignee(value),
      type: () => setSelectedType(value as TicketType),
      reporter: () => setSelectedReporter(value),
      dueDate: () => setDueDate(value),
      priority: () => setSelectedPriority(value as TicketPriority),
      status: () => setStatus(value as TicketStatus),
    };
    updateFunction[field]();
    setTimeout(() => {
      console.log(`Updated ${field}:`, value);
    }, 300);
  };
  const priorityIcon = {
    low: <CirclePlus className="size-5 text-yellow-600" />,
    mid: <CircleMinus className="size-5 text-green-800" />,
    high: <ClockAlert className="size-5 text-red-800" />,
  };
  const typeIcon = {
    bug: (
      <div className="bg-blue-100 p-1 rounded">
        <Bug className="size-4 text-blue-900" />
      </div>
    ),
    feature: (
      <div className="bg-green-100 p-1 rounded">
        <Binary className="size-4 text-green-700" />
      </div>
    ),
    task: (
      <div className="bg-indigo-100 p-1 rounded">
        <ClipboardCheck className="size-4 text-yellow-600" />
      </div>
    ),
  };
  const assignedUser = getUser(selectedAssignee);
  if (!showComponent)
    return (
      <div className="top-2 right-0 absolute w-10 h-full">
        <button
          onClick={() => setShowComponent(true)}
          className="group bg-slate-200 p-2 rounded-lg text-slate-400 hover:text-slate-800 cursor-pointer"
        >
          <ChevronLeft className="size-4 group-hover:scale-125 transition-all duration-300" />
        </button>
      </div>
    );
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col bg-white border-slate-200 border-l w-1/5 h-full font-sans"
    >
      <div className="flex justify-between items-center px-4 py-3 border-slate-200 border-b">
        <DropDown
          trigger={
            <div className="flex bg-blue-500 hover:bg-blue-600 rounded-md overflow-hidden font-semibold text-white text-xs">
              <button className="px-4 py-2 border-blue-600 border-r">
                {status === 'todo' ? 'To Do' : status}
              </button>
              <span className="px-2 py-2">
                <ChevronDown className="size-4" />
              </span>
            </div>
          }
          options={[
            {
              label: 'To Do',
              value: 'todo',
              icon: <ArrowRight className="size-4 text-blue-600" />,
            },
            {
              label: 'Needs Review',
              value: 'needReview',
              icon: <ArrowRight className="size-4 text-blue-600" />,
            },
            {
              label: 'Work In Progress',
              value: 'inProgress',
              icon: <ArrowRight className="size-4 text-blue-600" />,
            },
            {
              label: 'Completed',
              value: 'done',
              icon: <ArrowRight className="size-4 text-blue-600" />,
            },
          ]}
          onSelect={val => handleFieldUpdate('status', val)}
        />
        <button
          aria-label="close"
          onClick={() => setShowComponent(false)}
          className="hover:bg-slate-100 p-1.5 rounded-md text-slate-400 cursor-pointer"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="flex-1 space-y-6 p-4 overflow-y-auto">
        <div className="space-y-1.5">
          <span className="font-bold text-slate-700 text-xs">Priority</span>
          <DropDown
            trigger={
              <div className="flex justify-between items-center bg-white p-2 border border-slate-200 hover:border-slate-300 rounded-lg w-full cursor-pointer">
                <div className="flex items-center gap-2">
                  {priorityIcon[selectedPriority]}
                  <span className="text-slate-700 text-sm capitalize">
                    {selectedPriority === 'mid' ? 'Medium' : selectedPriority}
                  </span>
                </div>
                <ChevronDown className="size-4 text-slate-400" />
              </div>
            }
            options={[
              { label: 'Low', value: 'low', icon: priorityIcon.low },
              { label: 'Medium', value: 'mid', icon: priorityIcon.mid },
              { label: 'High', value: 'high', icon: priorityIcon.high },
            ]}
            onSelect={val => handleFieldUpdate('priority', val)}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-700 text-xs">Assigned To</span>
            {user?.id === assignedUser?.id && (
              <button
                onClick={() => handleFieldUpdate('assignee', user?.id || 'u1')}
                className="font-medium text-[11px] text-blue-500 hover:underline"
              >
                Assign to me
              </button>
            )}
          </div>
          <DropDown
            trigger={
              <div className="flex justify-between items-center bg-white p-2 border border-slate-200 hover:border-slate-300 rounded-lg w-full cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-200 rounded-full size-6 overflow-hidden">
                    <img src={assignedUser?.avatar} alt="avatar" />
                  </div>
                  <span className="text-slate-700 text-sm">{assignedUser?.name}</span>
                </div>
                <ChevronDown className="size-4 text-slate-400" />
              </div>
            }
            options={ticket.activeUsers.map(u => {
              const User = getUser(u);
              return {
                label: User?.name || '',
                value: User?.id || '',
                icon: <img src={User?.avatar} alt={User?.name} className="rounded-full size-5" />,
              };
            })}
            onSelect={val => handleFieldUpdate('assignee', val)}
          />
        </div>
        <div className="space-y-1.5">
          <span className="font-bold text-slate-700 text-xs">Project</span>
          <div className="flex justify-between items-center bg-white p-2.5 border border-slate-200 hover:border-slate-300 rounded-lg w-full cursor-pointer">
            <span className="text-slate-700 text-sm">Administrative</span>
            <ChevronDown className="size-4 text-slate-400" />
          </div>
        </div>
        <div className="space-y-1.5">
          <span className="font-bold text-slate-700 text-xs">Ticket Type</span>
          <DropDown
            trigger={
              <div className="flex justify-between items-center bg-white p-2 border border-slate-200 hover:border-slate-300 rounded-lg w-full cursor-pointer">
                <div className="flex items-center gap-2">
                  {typeIcon[selectedType || 'task']}
                  <span className="text-slate-700 text-sm capitalize">{selectedType}</span>
                </div>
                <ChevronDown className="size-4 text-slate-400" />
              </div>
            }
            options={[
              { label: 'Bug', value: 'bug', icon: typeIcon.bug },
              { label: 'Feature', value: 'feature', icon: typeIcon.feature },
              { label: 'Task', value: 'task', icon: typeIcon.task },
            ]}
            onSelect={val => handleFieldUpdate('type', val)}
          />
        </div>
        <div className="space-y-1.5">
          <span className="font-bold text-slate-700 text-xs">Due Date</span>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={e => handleFieldUpdate('dueDate', e.target.value)}
              className="flex justify-between items-center bg-white p-2 border border-slate-200 hover:border-slate-300 rounded-lg outline-none w-[60%] text-slate-700 text-sm cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="font-bold text-slate-700 text-xs">Reporter</span>
          <DropDown
            trigger={
              <div className="flex justify-between items-center bg-white p-2 border border-slate-200 hover:border-slate-300 rounded-lg w-full cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="bg-slate-200 rounded-full size-6 overflow-hidden">
                    <img src={getUser(selectedReporter)?.avatar} alt="avatar" />
                  </div>
                  <span className="text-slate-700 text-sm">{getUser(selectedReporter)?.name}</span>
                </div>
                <ChevronDown className="size-4 text-slate-400" />
              </div>
            }
            options={ticket.activeUsers.map(u => {
              const User = getUser(u);
              return {
                label: User?.name || '',
                value: User?.id || '',
                icon: <img src={User?.avatar} alt={User?.name} className="rounded-full size-5" />,
              };
            })}
            onSelect={val => handleFieldUpdate('reporter', val)}
          />
        </div>
        <div className="space-y-1.5 pb-2">
          <span className="font-bold text-slate-700 text-xs">Tags</span>
          {ticket.data.labels.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {ticket.data.labels.map((label, idx) => (
                <span
                  key={idx}
                  className="flex justify-between items-center gap-1 bg-slate-100 px-2 py-1 rounded-full font-medium text-slate-600 text-xs"
                >
                  {label}
                  <button>
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="block mb-1.5 text-slate-400 text-sm">No tags</span>
          )}
          <button className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-full font-medium text-slate-600 text-xs">
            Add Tag <Plus className="size-3" />
          </button>
        </div>
      </div>
      <div className="border-slate-200 border-t">
        {[
          { label: 'TASKS', count: 0 },
          { label: 'COLLECTED FIELDS', count: 0 },
          { label: 'LINKED TICKETS', count: 0 },
          { label: 'HISTORY', count: 0 },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center hover:bg-slate-50 px-4 py-3 border-slate-100 border-b cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-black text-[10px] text-slate-600 tracking-wider">
                {item.label}
              </span>
              {item.count > 0 && (
                <span className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-[10px] text-slate-500">
                  {item.count}
                </span>
              )}
            </div>
            <div className="bg-slate-50 p-0.5 rounded">
              <ChevronRight className="size-4 text-slate-400" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
function DropDown({
  trigger,
  options,
  onSelect,
}: {
  trigger: React.ReactNode;
  options: { label: string; value: string; icon?: React.ReactNode }[];
  onSelect: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="top-full left-0 z-50 absolute bg-white shadow-lg mt-1 border border-slate-200 rounded-lg w-full min-w-40 overflow-hidden">
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 hover:bg-slate-50 px-3 py-2 border-slate-100 last:border-0 border-b w-full text-left"
            >
              {option.icon}
              <span className="text-slate-700 text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
