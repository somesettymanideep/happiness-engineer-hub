import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  Brain,
  Wallet,
  Users,
  Plane,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Heart,
    title: "Life Coaching & Happiness Mentoring",
    features: [
      "Personal life balance coaching",
      "Stress management & clarity",
      "Goal setting & purpose discovery",
    ],
    color: "bg-rose-500/10 text-rose-500",
  },
  {
    icon: Sparkles,
    title: "Decoding Happiness – Awareness Sessions",
    features: [
      "Based on the book covering:",
      "Health, Wealth, Relationships",
      "Life Skills, Dreams & Spirituality",
    ],
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: Brain,
    title: "Psychology-Based Guidance",
    features: [
      "Mindset correction",
      "Emotional intelligence development",
      "Decision-making clarity",
    ],
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    icon: Wallet,
    title: "Financial Awareness & Investment Education",
    features: [
      "Basics of money management",
      "Savings, insurance & investments",
      "Stock market awareness (Beginner level)",
    ],
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: Users,
    title: "Corporate / Institutional Training",
    features: [
      "Train the Trainer sessions",
      "Motivation & discipline training",
      "Career guidance for youth",
    ],
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Plane,
    title: "Aviation Mentorship",
    features: [
      "Guidance for aspiring aircraft engineers",
      "Technical + life discipline mentoring",
      "Career path planning in aviation",
    ],
    color: "bg-cyan-500/10 text-cyan-500",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
              Services
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              What I Offer
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Drawing from 20+ years of experience across aviation, psychology,
              finance, and personal development, I offer transformative services
              to help you achieve balance and fulfillment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 border border-border"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Whether you're seeking personal growth, career guidance, or
              financial awareness, I'm here to help you find your path to
              balanced success.
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
