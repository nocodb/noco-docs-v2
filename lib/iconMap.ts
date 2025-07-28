import AlertCircle from '@/components/icons/AlertCircle';
import AlertTriangle from '@/components/icons/AlertTriangle';
import BaseOutlineLogo from '@/components/icons/BaseOutlineLogo';
import Book from '@/components/icons/Book';
import Cloud from '@/components/icons/Cloud';
import Code from '@/components/icons/Code';
import Database from '@/components/icons/Database';
import ERD from '@/components/icons/Erd';
import HelpCircle from '@/components/icons/HelpCircle';
import Info from '@/components/icons/Info';
import Layout from '@/components/icons/Layout';
import List from '@/components/icons/List';
import Monitor from '@/components/icons/Monitor';
import Play from '@/components/icons/Play';
import Plug from '@/components/icons/Plug';
import Sliders from '@/components/icons/Sliders';
import Table from '@/components/icons/Table';
import Terminal from '@/components/icons/Terminal';
import Type from '@/components/icons/Type';
import User from '@/components/icons/User';
import UserCreator from '@/components/icons/UserCreator';
import Users from '@/components/icons/Users';
import View from '@/components/icons/View';
import Bluesky from '@/components/icons/Bluesky';
import XTwitter from '@/components/icons/XTwitter';
import Facebook from '@/components/icons/Facebook';
import Linkedin from '@/components/icons/Linkedin';
import Extension from '@/components/icons/Extension';
import Sparkle from '@/components/icons/Sparkle';
import Chart from '@/components/icons/Chart';
import Legal from '@/components/icons/Legal';

const iconMap = {
    alertCircle: AlertCircle,
    alertTriangle: AlertTriangle,
    baseOutlineLogo: BaseOutlineLogo,
    book: Book,
    cloud: Cloud,
    code: Code,
    database: Database,
    erd: ERD,
    helpCircle: HelpCircle,
    info: Info,
    layout: Layout,
    list: List,
    monitor: Monitor,
    play: Play,
    plug: Plug,
    sliders: Sliders,
    table: Table,
    terminal: Terminal,
    type: Type,
    user: User,
    userCreator: UserCreator,
    users: Users,
    view: View,
    bluesky: Bluesky,
    xTwitter: XTwitter,
    facebook: Facebook,
    linkedin: Linkedin,
    extension: Extension,
    sparkle: Sparkle,
    chart: Chart,
    legal: Legal,
} as const;

type IconNameType = keyof typeof iconMap;

const IconName = Object.keys(iconMap)

export {iconMap, IconName};
export type {IconNameType};