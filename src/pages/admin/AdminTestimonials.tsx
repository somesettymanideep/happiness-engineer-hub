import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getTextTestimonials,
  saveTextTestimonial,
  deleteTextTestimonial,
  generateId,
} from "@/lib/storage";
import { TextTestimonial } from "@/types/testimonials";
import { useToast } from "@/hooks/use-toast";

const emptyTestimonial: Omit<TextTestimonial, "id" | "createdAt"> = {
  name: "",
  designation: "",
  review: "",
  image: "",
  order: 1,
  status: "active",
};

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<TextTestimonial[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyTestimonial);

  const loadData = () => {
    setTestimonials(getTextTestimonials().sort((a, b) => a.order - b.order));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const testimonial: TextTestimonial = {
      ...formData,
      id: editingId || generateId(),
      createdAt: editingId
        ? testimonials.find((t) => t.id === editingId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    };

    saveTextTestimonial(testimonial);
    toast({ title: editingId ? "Updated!" : "Added!", description: "Testimonial saved successfully." });
    setIsOpen(false);
    setEditingId(null);
    setFormData(emptyTestimonial);
    loadData();
  };

  const handleEdit = (testimonial: TextTestimonial) => {
    setFormData({
      name: testimonial.name,
      designation: testimonial.designation || "",
      review: testimonial.review,
      image: testimonial.image || "",
      order: testimonial.order,
      status: testimonial.status,
    });
    setEditingId(testimonial.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      deleteTextTestimonial(id);
      toast({ title: "Deleted!", description: "Testimonial removed." });
      loadData();
    }
  };

  const toggleStatus = (testimonial: TextTestimonial) => {
    saveTextTestimonial({
      ...testimonial,
      status: testimonial.status === "active" ? "inactive" : "active",
    });
    loadData();
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-serif font-bold text-foreground">Text Testimonials</h1>
          <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setEditingId(null);
              setFormData(emptyTestimonial);
            }
          }}>
            <DialogTrigger asChild>
              <Button variant="gold">
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit" : "Add"} Testimonial</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Designation</label>
                  <Input
                    value={formData.designation}
                    onChange={(e) => setFormData((p) => ({ ...p, designation: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Review *</label>
                  <Textarea
                    value={formData.review}
                    onChange={(e) => setFormData((p) => ({ ...p, review: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData((p) => ({ ...p, image: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Order</label>
                    <Input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData((p) => ({ ...p, order: parseInt(e.target.value) || 1 }))}
                      min={1}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as "active" | "inactive" }))}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <Button type="submit" variant="gold" className="w-full">
                  {editingId ? "Update" : "Add"} Testimonial
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Order</th>
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Designation</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">Review</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial, index) => (
                  <motion.tr
                    key={testimonial.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-border"
                  >
                    <td className="p-4">{testimonial.order}</td>
                    <td className="p-4 font-medium">{testimonial.name}</td>
                    <td className="p-4 hidden md:table-cell text-muted-foreground">
                      {testimonial.designation || "-"}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-muted-foreground max-w-xs truncate">
                      {testimonial.review}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(testimonial)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                          testimonial.status === "active"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        {testimonial.status === "active" ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {testimonial.status}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {testimonials.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No testimonials yet.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;
