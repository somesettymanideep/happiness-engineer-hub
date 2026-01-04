import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Trash2, Mail, MailOpen, Eye, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getContactSubmissions,
  updateContactSubmission,
  deleteContactSubmission,
} from "@/lib/storage";
import { ContactSubmission } from "@/types/testimonials";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const AdminMessages = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);

  const loadData = () => {
    setSubmissions(getContactSubmissions());
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === "all" || sub.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleView = (submission: ContactSubmission) => {
    if (submission.status === "unread") {
      const updated = { ...submission, status: "read" as const };
      updateContactSubmission(updated);
      loadData();
    }
    setSelectedMessage(submission);
  };

  const toggleStatus = (submission: ContactSubmission) => {
    const updated = {
      ...submission,
      status: submission.status === "read" ? "unread" as const : "read" as const,
    };
    updateContactSubmission(updated);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteContactSubmission(id);
      toast({ title: "Deleted!", description: "Message removed." });
      loadData();
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-serif font-bold text-foreground mb-8">Contact Messages</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "read" | "unread")}
            className="h-10 px-3 rounded-md border border-input bg-background"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Email</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">Subject</th>
                  <th className="text-left p-4 font-medium hidden sm:table-cell">Date</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission, index) => (
                  <motion.tr
                    key={submission.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className={`border-t border-border ${submission.status === "unread" ? "bg-accent/5" : ""}`}
                  >
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(submission)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                          submission.status === "unread"
                            ? "bg-blue-500/10 text-blue-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {submission.status === "unread" ? (
                          <Mail className="w-3 h-3" />
                        ) : (
                          <MailOpen className="w-3 h-3" />
                        )}
                        {submission.status}
                      </button>
                    </td>
                    <td className="p-4 font-medium">{submission.name}</td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">{submission.email}</td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground max-w-xs truncate">
                      {submission.subject || "-"}
                    </td>
                    <td className="p-4 hidden sm:table-cell text-muted-foreground text-sm">
                      {format(new Date(submission.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleView(submission)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(submission.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredSubmissions.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              {searchQuery || filterStatus !== "all" ? "No messages match your filters." : "No messages yet."}
            </p>
          )}
        </div>

        {/* Message Detail Dialog */}
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Name</label>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Date</label>
                    <p className="font-medium">
                      {format(new Date(selectedMessage.createdAt), "MMM d, yyyy h:mm a")}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium">
                    <a href={`mailto:${selectedMessage.email}`} className="text-accent hover:underline">
                      {selectedMessage.email}
                    </a>
                  </p>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <p className="font-medium">{selectedMessage.phone}</p>
                  </div>
                )}
                {selectedMessage.subject && (
                  <div>
                    <label className="text-sm text-muted-foreground">Subject</label>
                    <p className="font-medium">{selectedMessage.subject}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-muted-foreground">Message</label>
                  <p className="mt-1 p-3 bg-muted rounded-lg whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <Button
                  variant="gold"
                  className="w-full"
                  onClick={() => window.open(`mailto:${selectedMessage.email}`, "_blank")}
                >
                  Reply via Email
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
