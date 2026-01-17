import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, GraduationCap, BookOpen, Brain, Mic, Film, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { HighlightCard } from "@/components/shared/HighlightCard";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { VideoTestimonialsCarousel } from "@/components/testimonials/VideoTestimonialsCarousel";
import heroImage from "@/assets/hero-home.png";
import profilePhoto from "@/assets/profile-photo.png";
import bookCover from "@/assets/book-cover.jpg";

const highlights = [
  {
    icon: Plane,
    title: "20+ Years Aviation",
    description: "Aircraft Maintenance Engineer at SpiceJet with hands-on experience in aviation safety and discipline.",
  },
  {
    icon: GraduationCap,
    title: "Instructor at GMR",
    description: "Shaping the future of aviation at Shamshabad Airport, training quality aircraft engineers.",
  },
  {
    icon: BookOpen,
    title: "Author",
    description: "Published 'Decoding Happiness' - a guide to understanding balance across life's dimensions.",
  },
  {
    icon: Brain,
    title: "MSc Psychology",
    description: "Deep understanding of human behavior from Andhra University, Visakhapatnam.",
  },
  {
    icon: Mic,
    title: "Dale Carnegie Trainer",
    description: "Certified Train the Trainer from Dale Carnegie, Bangalore.",
  },
  {
    icon: Film,
    title: "Film Producer",
    description: "Producer of Telugu Short Film 'Krishna Gadi Premakatha' and creative contributor.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Aircraft engineering at dawn"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-gold/20 rounded-full text-gold text-sm font-medium mb-6">
                Life Engineer | Aircraft Engineer | Author | Mentor | Psycholigist
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight mb-6">
                Balance is the{" "}
                <span className="text-gradient-gold">Key Secret</span> of
                Happiness
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 max-w-xl">
                Welcome to my official portfolio. I am a Life Engineer, Aircraft
                Maintenance Professional, Instructor, Author, and Mentor with over
                20 years of aviation experience and a deep passion for human
                happiness, balance, and personal growth.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="gold" size="lg" asChild>
                  <Link to="/about">
                    Know More About Me
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/services">Explore My Services</Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/contact">Contact Me</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gold/20 rounded-full blur-3xl" />
                <img
                  src={profilePhoto}
                  alt="Life Engineer Profile"
                  className="relative w-80 h-96 object-cover rounded-2xl shadow-2xl border-4 border-gold/30"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-gold rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            label="Highlights"
            title="A Life of Experience & Growth"
            description="Two decades of dedication across aviation, psychology, training, and personal development."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <HighlightCard
                key={highlight.title}
                icon={highlight.icon}
                title={highlight.title}
                description={highlight.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Book Preview Section */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <span className="inline-block px-4 py-1.5 bg-gold/20 rounded-full text-gold text-sm font-medium mb-4">
                Featured Book
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6">
                Decoding Happiness
              </h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-6">
                A practical guide to understanding why happiness is lost and how
                balance can be restored across the six pillars of life: Health,
                Wealth, Relationships, Skills, Dreams, and Spirituality.
              </p>
              <Button variant="gold" size="lg" asChild>
                <a  href="https://www.amazon.in/dp/B0GCYVW13X?ref=cm_sw_r_ffobk_cso_wa_apan_dp_6AK8W2WMKW6KAZKSJ36W_9&ref_=cm_sw_r_ffobk_cso_wa_apan_dp_6AK8W2WMKW6KAZKSJ36W_9&social_share=cm_sw_r_ffobk_cso_wa_apan_dp_6AK8W2WMKW6KAZKSJ36W_9&bestFormat=true">
                  Discover the Book
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-gold/10 rounded-3xl blur-2xl" />
                <img
                  src={bookCover}
                  alt="Decoding Happiness Book"
                  className="relative w-64 md:w-72 rounded-lg shadow-2xl animate-float"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            label="Philosophy"
            title="What I Believe"
            description="Core principles that guide my life and work."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { text: "Success without happiness is failure", emoji: "🎯" },
              { text: "Balance is the real secret of a fulfilled life", emoji: "⚖️" },
              { text: "Happiness is a skill, not an accident", emoji: "✨" },
              { text: "Money is a tool, not the goal", emoji: "💰" },
              { text: "Health is wealth", emoji: "💪" },
              { text: "Relationships define quality of life", emoji: "❤️" },
            ].map((belief, index) => (
              <motion.div
                key={belief.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 bg-background p-5 rounded-xl shadow-soft"
              >
                <span className="text-3xl">{belief.emoji}</span>
                <p className="font-medium text-foreground">{belief.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Video Testimonials Section */}
      <VideoTestimonialsCarousel />

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Let's connect and explore how we can work together on your journey
              towards a balanced, fulfilled life.
            </p>
            <Button variant="gold" size="xl" asChild>
              <Link to="/contact">
                Let's Connect
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
