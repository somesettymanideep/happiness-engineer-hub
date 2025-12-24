import { motion } from "framer-motion";
import { Target, Compass, Heart, Users, Globe } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/shared/SectionHeader";

const Vision = () => {
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
              Purpose
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Vision & Mission
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A life dedicated to sharing wisdom and guiding others towards
              fulfillment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6">
                My Vision
              </h2>
              <p className="text-2xl md:text-3xl text-primary-foreground/90 font-serif italic leading-relaxed">
                "To share my knowledge with{" "}
                <span className="text-gold font-semibold">
                  1% of the world's population
                </span>{" "}
                before I reach God / the Universe."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Compass className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                My Mission
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                To help and be part of the lives of family, friends, colleagues,
                students, and society, guiding them towards a{" "}
                <span className="text-accent font-semibold">
                  satisfied, successful, and balanced life.
                </span>
              </p>
            </motion.div>

            {/* Mission Pillars */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: Heart,
                  title: "Family & Friends",
                  description:
                    "Being present and supportive for those closest to me.",
                },
                {
                  icon: Users,
                  title: "Students & Colleagues",
                  description:
                    "Mentoring the next generation of professionals and leaders.",
                },
                {
                  icon: Globe,
                  title: "Society",
                  description:
                    "Contributing to the greater good through knowledge sharing.",
                },
              ].map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center bg-card p-8 rounded-2xl shadow-soft border border-border"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <pillar.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            label="Core Values"
            title="What Drives Me"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Authenticity",
                description: "Being genuine in every interaction and sharing real experiences, not just theories.",
              },
              {
                title: "Service",
                description: "Putting others' growth and happiness at the center of my work.",
              },
              {
                title: "Balance",
                description: "Practicing what I preach – maintaining equilibrium in all life dimensions.",
              },
              {
                title: "Growth",
                description: "Continuous learning and evolving to serve others better.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-6 rounded-xl shadow-soft border border-border"
              >
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Vision;
