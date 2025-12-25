import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  label?: string;
  backgroundImage: string;
  breadcrumbs: BreadcrumbItem[];
}

export const PageHero = ({
  title,
  subtitle,
  label,
  backgroundImage,
  breadcrumbs,
}: PageHeroProps) => {
  return (
    <section className="relative pt-32 pb-20 min-h-[400px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="mb-6"
        >
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-primary-foreground/70 hover:text-gold transition-colors flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </li>
            {breadcrumbs.map((item, index) => (
              <li key={item.label} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-primary-foreground/50" />
                {item.href ? (
                  <Link
                    to={item.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gold font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl"
        >
          {label && (
            <span className="inline-block px-4 py-1.5 bg-gold/20 backdrop-blur-sm rounded-full text-gold text-sm font-medium mb-4 border border-gold/30">
              {label}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};
