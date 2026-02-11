import { useEffect, useState } from 'react';
import type { Ticket } from '../../../lib/types/tickets';
import type { User } from '../../../lib/types/Users';
import getUser from '../../../lib/utils/getUser';
import {
  Bold,
  Bug,
  Ellipsis,
  Eye,
  Image,
  Italic,
  Mail,
  MessageSquarePlus,
  MessageSquareReply,
  Paperclip,
  Send,
  Underline,
} from 'lucide-react';
import formatDate from '../../../lib/utils/dateFormattter';
import { motion } from 'motion/react';
export default function SelectedTicket({ selectedTicket }: { selectedTicket: Ticket }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('Public Reply');
  useEffect(() => {
    if (!selectedTicket) return;
    setUsers(
      selectedTicket.activeUsers.map(user => {
        const userData = getUser(user);
        return userData!;
      })
    );
    setTicket(selectedTicket);
  }, [selectedTicket]);
  return (
    <div className="flex flex-col bg-white w-full h-full">
      <div className="py-2 border-slate-300 border-b">
        <h1 className="px-4 font-bold text-md text-slate-800">{ticket?.data.title}</h1>
        <div className="flex justify-between items-center gap-2 px-4">
          <span className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="size-4 text-blue-950">
              <Bug className="size-4" />
            </span>
            {ticket?.id} |{' '}
            {ticket?.createdAt && formatDate(ticket?.createdAt!, 'DD/MM/YY HH:MM IST')}
          </span>
          <span className="flex items-center gap-4 px-5">
            <span>
              <Mail className="size-5" />
            </span>{' '}
            <span className="flex items-center gap-1">
              <Eye className="size-5" />
              {ticket?.activeUsers.length}
            </span>
            <button className="">
              <Ellipsis className="size-5" />
            </button>
            <span className="flex">
              {users.map((user, index) => {
                return (
                  <button
                    style={{
                      translate: -5 * index,
                      zIndex: users.length - index,
                      border: '2px solid #fff',
                    }}
                    className="hover:z-150 rounded-full size-5 hover:scale-110 transition-all duration-300 cursor-pointer"
                  >
                    <img src={user.avatar} alt={user.name} className="rounded-full size-5" />
                  </button>
                );
              })}
            </span>
          </span>
        </div>
      </div>
      <div className="p-4 h-full overflow-y-auto">
        <div id="inputBox" className="rounded-xl inputBoxShadow">
          <div className="relative flex border-slate-300 border-b">
            {['Public Reply', 'Private Comment'].map(label => {
              const isSelected = selectedTab === label;
              return (
                <button
                  key={label}
                  onClick={() => setSelectedTab(label)}
                  className="relative px-4 py-2 rounded-l-lg overflow-hidden cursor-pointer"
                >
                  {label}
                  <motion.div
                    animate={{ y: isSelected ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-blue-500 rounded-t-2xl w-full h-0.5 translate-y-2"
                  ></motion.div>
                </button>
              );
            })}
          </div>
          <textarea
            className="p-4 outline-0 w-full min-h-32"
            placeholder={selectedTab === 'Public Reply' ? 'Add a reply...' : 'Reply Privately...'}
          />
          <div className="flex justify-between items-center gap-5 px-4 py-4 text-slate-500">
            <span className="flex gap-6">
              <Bold className="size-5" />
              <Italic className="size-5" />
              <Underline className="size-5" />
              <Image className="size-5" />
              <Paperclip className="size-5" />
              <MessageSquarePlus className="size-5" />
              <MessageSquareReply className="size-5" />
            </span>
            <span className="flex gap-5 px-4">
              <span className="flex justify-center items-center gap-2">
                <h5>Add to KB</h5>
                <input type="checkbox" />
              </span>
              <span className="flex justify-center items-center bg-slate-400/20 p-2 rounded-lg">
                <Send className="size-5" />
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 space-y-3 mt-4 h-full">
          <div className="flex flex-col gap-4 mt-4">
            {ticket?.data.messages.map((message, index) => {
              const userReply = getUser(message.userReply || 'u1');
              const userSender = getUser(message.userSender || 'u1');
              console.log(message);
              return (
                <div
                  key={index}
                  className="bg-white shadow-sm p-4 border border-slate-200 rounded-lg font-sans"
                >
                  <div id="header" className="flex gap-3 w-full">
                    <div className="bg-slate-200 rounded-full w-10 h-10 overflow-hidden shrink-0">
                      <img
                        src={userSender?.avatar}
                        alt={userSender?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <h5>{userSender?.name}</h5>
                        <h5 className="text-slate-500 text-xs">
                          {message.time && formatDate(message.time, 'DD/MM/YY HH:MM IST')}
                        </h5>
                      </div>
                      <div className="flex gap-2">
                        <span className="py-1 rounded text-slate-800 text-xs">
                          {`To ${userReply?.name} <${userReply?.email}>`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 ml-14">
                    <p className="mb-4 text-slate-800 leading-relaxed">{message.text}</p>

                    {message.docs && message.docs.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {message.docs.map((doc, docIdx) => (
                          <button
                            key={docIdx}
                            className="flex flex-col bg-slate-50 p-2 border border-slate-200 rounded-lg min-w-45 cursor-pointer"
                          >
                            <span className="font-semibold text-slate-700 text-sm">
                              {doc.title}
                            </span>
                            <span className="text-slate-500 text-xs">
                              {doc.uploadedDate.toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                              ,{' '}
                              {doc.uploadedDate.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
