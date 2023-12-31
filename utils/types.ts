import { links } from "../config/data";

export type SectionName = (typeof links)[number]["name"];

export default Expense;
export interface ChatSearchProps {
    onSearch: (query: string) => void;
    searchResults: string;
    onJumpTo: (message: ChatMessage) => void;
    chatHistory: ChatMessage[];
}

export interface IMessage {
    id: string;
    name: string;
    message: string;
    image?: string;
    timestamp: string;
    sender: string;
}

export interface MessageDisplayProps {
    data: IMessage[];
    searchTerm: string;
    currentUser?: string;
}

export interface ChatMessage {
    name: string;
    image: ReactNode;
    id: string;
    message: string;
    type: 'sent' | 'received';
    attachments?: any;
    sender: string;
    isSelf: boolean;
    timestamp: Date;
}

export interface DashMenuItem {
    title?: string;
    text?: string;
    icon?: JSX.Element;
    items?: DashMenuItem[];
}

export type LinkProps = {
    name: string;
    hash: string;
};

export interface DashMenuSection {
    slice(arg0: number, arg1: number): unknown;
    title?: string;
    items: DashMenuItem[];
}


export type ThemeBlockProps = {
    children?: React.ReactNode;
    flexDir?: "row" | "col";
    borderRadius?: string;
    gap?: string;
    width?: string;
    title?: string;
    className?: string;
};

export type iconProps = {
    fill?: string;
    size?: string;
    className?: string;
    w?: string;
    h?: string;
    style?: React.CSSProperties;
}

export interface Thought {
    id: string;
    selectedDate?: Date;
    title: string;
    description: string;
    createdAt: any;
    status: string;
    priority: string;
    label: string;
    task: string;
    subject?: string;
    userId?: string;
}


export interface Savings {
    id: string;
    name: string;
    createdAt: any;
    savingsAmount: number;
}

export interface IncomeProps {
    id: string;
    name: string;
    isLoading: boolean;
    expenseAmount: number;
    incomeAmount: number;
    createdAt: any;
    type: 'income' | 'expense';
}

export interface Task {
    id: string;
    title: string;
    label: string;
    priority: string;
    task: string;
    description: string;
    createdAt: string;
    status: string;
}

export interface SiteConfig {
    name: string;
    description: string;
    url: string;
    links: {
        gitlab?: string;
        github?: string;
        linkedin?: string;
        whatsapp?: string;
        email?: string;
        baseurl?: string;
    };
}

export type NavItem = {
    title: string
    href?: string
}

export type LayoutProps = {
    children: React.ReactNode
}

