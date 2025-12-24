import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface HighlightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export const HighlightCard = ({
  icon: Icon,
  title,
  description,
  index = 0,
}: HighlightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border"
    >
      <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300" />
      <div className="relative">
        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
