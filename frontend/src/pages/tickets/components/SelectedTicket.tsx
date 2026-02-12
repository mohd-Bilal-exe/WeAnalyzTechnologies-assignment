import { useEffect, useState } from 'react';
import type { Ticket, TicketMessage } from '../../../lib/types/tickets';
import type { User } from '../../../lib/types/Users';
import getUser from '../../../lib/utils/getUser';
import {
  Binary,
  Bold,
  Bug,
  ClipboardCheck,
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
  X,
} from 'lucide-react';
import formatDate from '../../../lib/utils/dateFormattter';
import { motion } from 'motion/react';
export default function SelectedTicket({ selectedTicket }: { selectedTicket: Ticket }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('Public Reply');
  const [message, setMessage] = useState<TicketMessage>({
    userSender: '',
    userReply: [],
    text: '',
    time: null,
    docs: [],
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [userInput, setUserInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
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

  const handleMessagePropertyUpdate = (field: string, value: string) => {
    if (field === 'text') {
      setTimeout(() => {
        setMessage(prev => ({ ...prev, text: value }));
      }, 100);
    } else {
      setMessage(prev => ({ ...prev, userReply: [...(prev.userReply || []), value as string] }));
    }
  };

  const handleUserInputChange = (value: string) => {
    setUserInput(value);
    if (value.trim()) {
      const filtered = users.filter(
        user =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          user.id.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowUserModal(true);
    } else {
      setShowUserModal(false);
      setFilteredUsers([]);
    }
  };

  const handleUserSelect = (user: User) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
      handleMessagePropertyUpdate('userReply', user.id);
    }
    setShowUserModal(false);
    setUserInput('');
    setFilteredUsers([]);
  };

  const removeSelectedUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
  };
  const handleSendMessage = () => {
    if (selectedUsers.length < 1) {
      alert('Please select someone to send the message.');
    } else if (!message.text) {
      alert('Please type in a  message before sending.');
    }
    setMessage({
      ...message,
      userSender: 'u1',
      time: new Date(),
    });
    console.log('Message to send', message);
  };
  const typeIcon = {
    bug: <Bug className="size-4 text-blue-900" />,
    feature: <Binary className="size-4 text-green-700" />,
    task: <ClipboardCheck className="size-4 text-blue-600" />,
  };
  return (
    <div className="flex flex-col bg-white border-0 w-4/5 h-full">
      <div className="py-1.5 border-slate-300 border-b">
        <h1 className="px-4 font-bold text-md text-slate-800">{ticket?.data.title}</h1>
        <div className="flex justify-between items-center gap-2 px-4">
          <span className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="size-4 text-blue-950">{typeIcon[ticket?.type || 'task']}</span>
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
          <div className="relative flex flex-wrap items-center gap-2 px-4 pt-4 font-medium text-slate-500">
            <span>To:</span>
            {selectedUsers.map(user => (
              <span
                key={user.id}
                className="flex items-center gap-1 bg-blue-100 py-1 pr-3 pl-1 rounded-full text-blue-800 text-xs"
              >
                <img src={user.avatar} alt={user.name} className="rounded-full size-4" />
                {user.name} {`<${user.email}>`}
                <button
                  onClick={() => removeSelectedUser(user.id)}
                  className="hover:bg-blue-200 rounded-full"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={userInput}
              onChange={e => handleUserInputChange(e.target.value)}
              placeholder="Type name, email or ID..."
              className="flex-1 px-2 py-1 border-slate-300 rounded outline-none min-w-48 text-sm"
            />
            {showUserModal && filteredUsers.length > 0 && (
              <UserSelectionModal
                filteredUsers={filteredUsers}
                handleUserSelect={handleUserSelect}
              />
            )}
          </div>
          <textarea
            className="p-4 outline-0 w-full min-h-32"
            onChange={e => handleMessagePropertyUpdate('text', e.target.value)}
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
              <button
                onClick={handleSendMessage}
                className="group flex justify-center items-start bg-slate-400/20 p-2 rounded-lg size-7 overflow-hidden hover:scale-120 active:scale-100 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <span className="flex flex-col gap-3 rotate-45 transition-all -translate-x-3 -translate-y-2 group-hover:-translate-y-7.5 group-hover:translate-x-2.5 duration-200 ease-in-out">
                  <Send className="size-5 -rotate-45" />
                  <Send className="size-5 -rotate-45" />
                </span>
              </button>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 space-y-3 mt-4 h-full">
          <div className="flex flex-col gap-4 mt-4">
            {ticket?.data.messages.map((message, index) => {
              const userReply = message.userReply
                ? message.userReply.map(replyUser => getUser(replyUser as string))
                : [];
              const userSender = getUser(message.userSender || 'u1');
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
                        {userReply.length > 0 &&
                          userReply.map(replyUser => (
                            <span className="py-1 rounded text-slate-800 text-xs">
                              {`To ${replyUser?.name} <${replyUser?.email}>`}
                            </span>
                          ))}
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
function UserSelectionModal({
  filteredUsers,
  handleUserSelect,
}: {
  filteredUsers: User[];
  handleUserSelect: (user: User) => void;
}) {
  return (
    <div className="top-full left-0 z-50 absolute bg-white shadow-lg mt-1 border border-slate-200 rounded-lg w-64 max-h-60 overflow-y-auto">
      {filteredUsers.map(user => (
        <button
          key={user.id}
          onClick={() => handleUserSelect(user)}
          className="flex items-center gap-2 hover:bg-slate-100 p-2 border-slate-100 border-b w-full text-left"
        >
          <img src={user.avatar} alt={user.name} className="rounded-full size-6" />
          <div className="flex flex-col">
            <span className="font-medium text-slate-800 text-sm">{user.name}</span>
            <span className="text-slate-500 text-xs">{user.email}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
