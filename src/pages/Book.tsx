import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Heart, Wallet, Users, Lightbulb, Sparkles, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import bookCover from "@/assets/book-mockup.png";
import heroBook from "@/assets/hero-book.jpg";

const pillars = [
  {
    icon: Heart,
    title: "Health",
    description: "The foundation of all happiness – physical and mental wellness.",
  },
  {
    icon: Wallet,
    title: "Wealth",
    description: "Financial freedom as a tool for peace, not an end goal.",
  },
  {
    icon: Users,
    title: "Relationships",
    description: "The quality of connections that define life's richness.",
  },
  {
    icon: Lightbulb,
    title: "Life Skills",
    description: "Practical abilities for navigating life's challenges.",
  },
  {
    icon: Sparkles,
    title: "Dreams",
    description: "Aspirations that give purpose and direction to life.",
  },
  {
    icon: BookOpen,
    title: "Spirituality",
    description: "Inner peace and connection to something greater.",
  },
];

const Book = () => {
  return (
    <Layout>
      <PageHero
        title="Decoding Happiness"
        subtitle="A practical guide to understanding why happiness is lost and how balance can be restored."
        label="Featured Book"
        backgroundImage={heroBook}
        breadcrumbs={[{ label: "Book" }]}
      />

      {/* Book Details Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-accent/20 rounded-3xl blur-2xl" />
                <img
                  src={bookCover}
                  alt="Decoding Happiness Book Cover"
                  className="relative w-72 md:w-80 rounded-xl shadow-2xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                About the Book
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                A practical guide to understanding why happiness is lost and how
                balance can be restored across health, wealth, relationships,
                skills, dreams, and spirituality.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                This book distills decades of learning, personal experiences, and
                insights from psychology, finance, relationships, and spirituality
                into actionable wisdom for achieving a balanced, fulfilled life.
              </p>
              <Button variant="gold" size="lg" asChild>
                <a href=" https://amzn.in/d/6Rk5EQT" target="_blank" rel="noopener noreferrer">
                  Get Your Copy
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Six Pillars Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            label="The Framework"
            title="Six Pillars of Happiness"
            description="The book explores how balance across these six dimensions creates lasting fulfillment."
            light
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <pillar.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-2">
                  {pillar.title}
                </h3>
                <p className="text-primary-foreground/70">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Insights Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            label="Key Insights"
            title="What You'll Learn"
          />

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              "Why modern success often leads to emptiness, not fulfillment",
              "How to identify and address imbalances in your life",
              "Practical frameworks for building lasting happiness",
              "The connection between financial health and mental peace",
              "How relationships impact every other area of life",
              "Finding purpose through dreams and spirituality",
            ].map((insight, index) => (
              <motion.div
                key={insight}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-card p-5 rounded-xl shadow-soft border border-border"
              >
                <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 font-serif font-bold text-accent">
                  {index + 1}
                </span>
                <p className="text-foreground font-medium">{insight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Want to Learn Directly?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Beyond the book, I offer awareness sessions and workshops based on
              its principles. Let's explore together.
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">
                Schedule a Session
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
