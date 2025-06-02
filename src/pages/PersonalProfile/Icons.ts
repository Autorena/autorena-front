import { ReactComponent as Listing } from "../../assets/profile/listings.svg";
import { ReactComponent as Documents } from "../../assets/profile/folder.svg";
import { ReactComponent as Logo3 } from "../../assets/profile/logo-3.svg";
import { ReactComponent as Support } from "../../assets/profile/support.svg";
import { ReactComponent as Suitcase } from "../../assets/profile/suitcase.svg";
import { ReactComponent as Wallet } from "../../assets/profile/wallet.svg";
import { ReactComponent as Message } from "../../assets/profile/message.svg";
import { ReactComponent as Plus } from "../../assets/profile/plus.svg";
import { ReactComponent as Eye } from "../../assets/profile/eye.svg";
import { ReactComponent as Agent } from "../../assets/profile/agent.svg";
import { ReactComponent as Car } from "../../assets/profile/car.svg";
import { ReactComponent as Payment } from "../../assets/profile/payment.svg";
import { ReactComponent as Favorite } from "../../assets/profile/favorites.svg";
import { ReactComponent as Notific } from "../../assets/profile/notification.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";

export const Icons = {
  Listing,
  Documents,
  Logo3,
  Support,
  Suitcase,
  Wallet,
  Message,
  Plus,
  Eye,
  Agent,
  Car,
  Payment,
  Favorite,
  Notific,
  Settings,
} as const;

export type IconName = keyof typeof Icons;
