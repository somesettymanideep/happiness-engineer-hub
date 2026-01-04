import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Video, Mail, Eye } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { getTextTestimonials, getVideoTestimonials, getContactSubmissions } from "@/lib/storage";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    textTestimonials: 0,
    videoTestimonials: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const textTests = getTextTestimonials();
    const videoTests = getVideoTestimonials();
    const messages = getContactSubmissions();

    setStats({
      textTestimonials: textTests.length,
      videoTestimonials: videoTests.length,
      totalMessages: messages.length,
      unreadMessages: messages.filter((m) => m.status === "unread").length,
    });
  }, []);

  const cards = [
    {
      title: "Text Testimonials",
      value: stats.textTestimonials,
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Video Testimonials",
      value: stats.videoTestimonials,
      icon: Video,
      href: "/admin/video-testimonials",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Total Messages",
      value: stats.totalMessages,
      icon: Mail,
      href: "/admin/messages",
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
      icon: Eye,
      href: "/admin/messages",
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-serif font-bold text-foreground mb-8">Dashboard</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={card.href}
                className="block bg-card p-6 rounded-xl border border-border shadow-soft hover:shadow-card transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold text-foreground">{card.value}</p>
                <p className="text-muted-foreground">{card.title}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-card p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Manage text and video testimonials from the sidebar</li>
            <li>• View and respond to contact form submissions</li>
            <li>• Toggle testimonial visibility with Active/Inactive status</li>
            <li>• Data is stored in your browser's localStorage</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
