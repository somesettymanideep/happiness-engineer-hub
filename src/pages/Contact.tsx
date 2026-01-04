import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Youtube, Linkedin, Instagram } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveContactSubmission, generateId } from "@/lib/storage";
import heroContact from "@/assets/hero-contact.jpg";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@lifeengineer.com",
    href: "mailto:contact@lifeengineer.com",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91-XXXXXXXXXX",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, India",
    href: "#",
  },
];

const socialLinks = [
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to localStorage
    saveContactSubmission({
      id: generateId(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      status: "unread",
      createdAt: new Date().toISOString(),
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <PageHero
        title="Contact Me"
        subtitle="Have a question, want to collaborate, or need guidance? I'd love to hear from you. Reach out and let's start a conversation."
        label="Get in Touch"
        backgroundImage={heroContact}
        breadcrumbs={[{ label: "Contact" }]}
      />

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
                Contact Information
              </h2>

              <div className="space-y-6 mb-10">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft border border-border hover:border-accent/30 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <info.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {info.label}
                      </p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                  Connect on Social Media
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300 text-muted-foreground"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card p-8 rounded-2xl shadow-card border border-border">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can I help you?"
                      required
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
