import {
    Calculator,
    Activity,
    FlaskConical,
    Globe,
    Code,
    Book,
    Music,
    Palette,
    Bitcoin,
    Atom,
    Feather,
    Landmark,
    Leaf,
    Brain,
    Receipt,
    Laptop,
    LucideIcon
} from "lucide-react";

// Map server icon names to Lucide components
// We include both seed data names and fallback names
export const iconMap: Record<string, LucideIcon> = {
    "Calculator": Calculator,
    "Activity": Activity,
    "FlaskConical": FlaskConical,
    "Globe": Globe,
    "Code": Code,
    "Book": Book,
    "Music": Music,
    "Palette": Palette,
    "Bitcoin": Bitcoin,
    "Atom": Atom,
    "Feather": Feather,
    "Landmark": Landmark,
    "Leaf": Leaf,
    "Brain": Brain,
    "Receipt": Receipt,
    "Laptop": Laptop
};

export const getIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || Book; // Default to Book if not found
};
