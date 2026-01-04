import { motion } from "framer-motion";
import { GraduationCap, Award, Tv, Users, Building2, TrendingUp } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PageHero } from "@/components/shared/PageHero";
import profilePhoto from "@/assets/profile-photo.png";
import heroAbout from "@/assets/hero-about.jpg";

const education = [
  "MSc Psychology – Andhra University, Visakhapatnam",
  "Train the Trainer – Dale Carnegie, Bangalore",
  "NISM – Life & Health Insurance",
  "NISM – Mutual Fund Advisor",
];

const media = [
  "Participant – Meelo Evaru Koteswarudu Season 3 (Host: Actor Nagarjuna)",
  "Author – Decoding Happiness (English Book)",
  "Producer – Telugu Short Film Krishna Gadi Premakatha (YouTube)",
  "Part of Crowdfunding Telugu Movie Mr & Miss",
];

const associations = [
  "Former Member – JCI Metro",
  "Former Member – AASRAA (Consumer Rights)",
  "Network Marketing Experience – 10+ Companies",
  "Real Estate Advisor – BBG, Chandana Valley, Vikyatha Projects",
  "Full-time Stock Market Trader – 1 Year",
  "Attended 20+ Stock Market Mentorship Programs",
];

const About = () => {
  return (
    <Layout>
      <PageHero
        title="My Journey"
        subtitle="From Aircraft Engineer to Life Engineer – a story of passion, learning, and transformation."
        label="About Me"
        backgroundImage={heroAbout}
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Journey Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I began my professional journey as an Aircraft Maintenance Engineer
                at the age of 22. I worked with SpiceJet Airlines for 20 long years,
                gaining hands-on experience in aviation safety, discipline, and
                responsibility.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Currently, I work as an Instructor at GMR, Shamshabad Airport, where
                my mission is to create quality future aircraft engineers who are
                technically strong and ethically grounded.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Over the years, my curiosity about human behavior, happiness,
                success, and balance in life led me to study Psychology and explore
                multiple fields including finance, relationships, health, and
                spirituality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
                <img
                  src={profilePhoto}
                  alt="Life Engineer"
                  className="relative w-72 md:w-80 h-96 object-cover rounded-2xl shadow-card border-4 border-accent/20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who I Am Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title="Who I Am"
            description="I am not just an engineer by profession, but a Life Engineer by passion."
            light
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-xl text-primary-foreground/90 leading-relaxed mb-8">
              My life experiences across aviation, psychology, finance, films,
              training, and mentoring shaped my belief that{" "}
              <span className="text-gold font-semibold">
                health, wealth, relationships, skills, dreams, and spirituality
                must grow together.
              </span>
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-primary-foreground/5 p-6 rounded-xl border border-primary-foreground/10">
                <p className="text-primary-foreground/80 italic text-lg">
                  "Success without happiness is failure."
                </p>
              </div>
              <div className="bg-primary-foreground/5 p-6 rounded-xl border border-primary-foreground/10">
                <p className="text-primary-foreground/80 italic text-lg">
                  "Balance is the real secret of a fulfilled life."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            label="Credentials"
            title="Education & Certifications"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {education.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-card p-5 rounded-xl shadow-soft border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-accent" />
                </div>
                <p className="font-medium text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            label="Media"
            title="Public Exposure"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {media.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-background p-5 rounded-xl shadow-soft border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Tv className="w-5 h-5 text-accent" />
                </div>
                <p className="font-medium text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Associations Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            label="Experience"
            title="Associations & Experience"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {associations.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 bg-card p-5 rounded-xl shadow-soft border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  {index < 2 ? (
                    <Users className="w-5 h-5 text-accent" />
                  ) : index < 4 ? (
                    <Building2 className="w-5 h-5 text-accent" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-accent" />
                  )}
                </div>
                <p className="font-medium text-foreground text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
