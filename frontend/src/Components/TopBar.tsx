import { ChevronDown, Gauge, Gift, HelpCircle, Search, User } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="top-0 z-10 flex justify-between items-center px-2 md:px-0 w-full h-16">
      <span id="title" className="flex items-center gap-2">
        <a href="/" className="bg-blue-300/80 m-3 p-2 rounded-xl">
          <Gauge className="shadow-amber-300 drop-shadow-2xl text-white" />
        </a>
        <h1 className="font-bold text-lg md:text-xl">Help Desk</h1>
      </span>
      <span id="search" className="hidden lg:flex gap-2 py-3">
        <span className="flex justify-center items-center bg-blue-950/50 p-2 px-4 rounded-xl text-white/50">
          <Search className="size-5" />
          <input
            placeholder="Search Turbo HelpDesk..."
            className="bg-transparent px-4 py-1 outline-0 placeholder:text-white/50"
          />
        </span>
      </span>
      <span
        id="actions"
        className="flex justify-between items-center gap-2 md:gap-7 px-2 md:px-8 py-3"
      >
        <span className="hidden md:flex justify-end items-center gap-4 bg-blue-500 px-4 py-2 rounded-xl">
          Create
          <button className="pl-1 border-l">
            <ChevronDown className="size-4" />
          </button>
        </span>
        <span className="flex justify-center items-center gap-2">
          <HelpCircle className="hidden md:block" />
          <Gift className="hidden md:block" />
          <span className="bg-amber-200 p-2 rounded-full text-black/50">
            <User className="size-4 md:size-6" />
          </span>
        </span>
      </span>
    </div>
  );
}
