// Lodge room list. Used by EnquiryDialog ("what are you enquiring about")
// and by the Rooms page. Rates are intentionally not listed: call to confirm.

export const CATEGORIES = ["Rooms", "Groups"] as const;
export type Category = (typeof CATEGORIES)[number];

export type MenuItem = {
  id: string;
  name: string;
  note: string;
  category: Category;
  emoji: string;
  tone: string;
};

export const MENU: MenuItem[] = [
  {
    id: "ac-double",
    name: "A/C Double Room",
    note: "Couples and solo travellers",
    category: "Rooms",
    emoji: "🛏️",
    tone: "#FFE9A8",
  },
  {
    id: "ac-family",
    name: "A/C Family Room",
    note: "Families, extra bed on request",
    category: "Rooms",
    emoji: "👨‍👩‍👧",
    tone: "#F7D9D0",
  },
  {
    id: "non-ac",
    name: "Non-A/C Room",
    note: "Budget stay (confirm availability)",
    category: "Rooms",
    emoji: "🌿",
    tone: "#DCEBC8",
  },
  {
    id: "group-wedding",
    name: "Group / Wedding Stay",
    note: "Multiple rooms, call for rates",
    category: "Groups",
    emoji: "💐",
    tone: "#E5DAF5",
  },
];

export const ROOM_TYPES = MENU.map((m) => m.name);
