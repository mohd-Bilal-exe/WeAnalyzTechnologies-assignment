import {
  Calculator,
  Contact,
  Inbox,
  Lightbulb,
  ScrollText,
  Grid2x2Plus,
  Layers,
  Workflow,
  Database,
  RotateCcw,
  ChartColumnBig,
  Settings,
  Bot,
  ChevronRight,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
export default function Sidebar() {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const menuItems = [
    {
      title: 'Tickets',
      icons: (
        <Inbox className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/tickets',
    },
    {
      title: 'Insights',
      icons: (
        <Lightbulb className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/insights',
    },
    {
      title: 'Contacts',
      icons: (
        <Contact className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/contacts',
    },
    {
      title: 'Inbox',
      icons: (
        <ScrollText className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/inbox',
    },
    {
      title: 'Budget',
      icons: (
        <Calculator className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/budget',
    },
    {
      title: 'Create',
      icons: (
        <Grid2x2Plus className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/create',
    },
    {
      title: 'Organize',
      icons: (
        <Layers className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/organize',
    },
    {
      title: 'Workflow',
      icons: (
        <Workflow className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/workflow',
    },
    {
      title: 'AI',
      icons: (
        <Bot className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/ai',
    },
    {
      title: 'Data',
      icons: (
        <Database className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/you',
    },
    {
      title: 'Costs',
      icons: (
        <RotateCcw className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/costs',
    },
    {
      title: 'Reports',
      icons: (
        <ChartColumnBig className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/reports',
    },
    {
      title: 'Settings',
      icons: (
        <Settings className="size-6 group-hover:text-amber-400 group-active:scale-100 group-hover:scale-110" />
      ),
      href: '/settings',
    },
  ];
  const navigateToPath = (path: string) => {
    if (!path && pathName.includes(path)) return;
    navigate(path);
  };
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <aside className="flex flex-col justify-between gap-12 mt-16 md:mt-0 w-fit h-auto md:h-4/5">
      <motion.ul
        animate={{ width: isExpanded ? '150px' : '50px' }}
        className="flex flex-col gap-1 overflow-hidden"
      >
        {menuItems.map((item, index) => {
          const active = pathName.includes(item.href);

          return (
            <motion.li
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02,  duration:0.3 }}
              key={index}
              className="w-full"
            >
              <button
                onClick={() => navigateToPath(item.href)}
                className={`group relative flex justify-between items-center p-2 px-4 rounded-lg transition-all duration-300 ease-in-out cursor-pointer ${active ? 'text-amber-500/90' : 'text-white'} ${isExpanded ? 'hover:bg-amber-200/5 ml-2' : ''} `}
              >
                {active && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: isExpanded?-8:0 }}
                    transition={{ duration: 0.3 }}
                    className={`left-0  absolute bg-amber-500 rounded-r-full w-1 h-7`}
                  />
                )}
                {item.icons}
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="ml-4 w-fit font-medium whitespace-nowrap"
                  >
                    {item.title}
                  </motion.span>
                )}
              </button>
            </motion.li>
          );
        })}
      </motion.ul>
      <button onClick={toggleExpansion} className="place-self-start p-3">
        <div className="bg-amber-50/5 p-2 rounded-xl">
          <ChevronRight
            className={`size-5 ${isExpanded ? 'rotate-180' : ''} transition-transform duration-300 ease-in-out`}
          />
        </div>
      </button>
    </aside>
  );
}
