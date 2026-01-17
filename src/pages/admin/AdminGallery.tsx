import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Eye, EyeOff, Image } from "lucide-react";
import { GalleryPhoto } from "@/types/testimonials";
import {
  getGalleryPhotos,
  saveGalleryPhoto,
  deleteGalleryPhoto,
  generateId,
} from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

const AdminGallery = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    order: 1,
    status: "active" as "active" | "inactive",
  });
  const { toast } = useToast();

  const loadPhotos = () => {
    const allPhotos = getGalleryPhotos().sort((a, b) => a.order - b.order);
    setPhotos(allPhotos);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      order: photos.length + 1,
      status: "active",
    });
    setEditingPhoto(null);
  };

  const handleOpenDialog = (photo?: GalleryPhoto) => {
    if (photo) {
      setEditingPhoto(photo);
      setFormData({
        title: photo.title,
        description: photo.description || "",
        imageUrl: photo.imageUrl,
        category: photo.category || "",
        order: photo.order,
        status: photo.status,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const photo: GalleryPhoto = {
      id: editingPhoto?.id || generateId(),
      title: formData.title,
      description: formData.description || undefined,
      imageUrl: formData.imageUrl,
      category: formData.category || undefined,
      order: formData.order,
      status: formData.status,
      createdAt: editingPhoto?.createdAt || new Date().toISOString(),
    };

    saveGalleryPhoto(photo);
    loadPhotos();
    handleCloseDialog();

    toast({
      title: editingPhoto ? "Photo Updated" : "Photo Added",
      description: `"${photo.title}" has been ${editingPhoto ? "updated" : "added"} successfully.`,
    });
  };

  const handleDelete = (photo: GalleryPhoto) => {
    if (confirm(`Are you sure you want to delete "${photo.title}"?`)) {
      deleteGalleryPhoto(photo.id);
      loadPhotos();
      toast({
        title: "Photo Deleted",
        description: `"${photo.title}" has been deleted.`,
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = (photo: GalleryPhoto) => {
    const updatedPhoto = {
      ...photo,
      status: photo.status === "active" ? "inactive" : "active",
    } as GalleryPhoto;
    saveGalleryPhoto(updatedPhoto);
    loadPhotos();
    toast({
      title: `Photo ${updatedPhoto.status === "active" ? "Activated" : "Deactivated"}`,
      description: `"${photo.title}" is now ${updatedPhoto.status}.`,
    });
  };

  const categories = ["Aviation", "Training", "Events", "Personal", "Book", "Other"];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Gallery Management</h1>
            <p className="text-muted-foreground">Add, edit, and manage gallery photos</p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Photo
          </Button>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`bg-card rounded-xl border border-border overflow-hidden ${
                photo.status === "inactive" ? "opacity-60" : ""
              }`}
            >
              <div className="aspect-square bg-muted relative">
                {photo.imageUrl ? (
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      photo.status === "active"
                        ? "bg-green-500/20 text-green-600"
                        : "bg-red-500/20 text-red-600"
                    }`}
                  >
                    {photo.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground truncate">{photo.title}</h3>
                {photo.category && (
                  <p className="text-sm text-muted-foreground">{photo.category}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">Order: {photo.order}</p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(photo)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(photo)}
                  >
                    {photo.status === "active" ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(photo)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <Image className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Photos Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding photos to your gallery.
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Photo
            </Button>
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingPhoto ? "Edit Photo" : "Add New Photo"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Photo title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL *</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of the photo"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 1 })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "inactive") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingPhoto ? "Update" : "Add"} Photo
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
