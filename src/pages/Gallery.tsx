import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/shared/PageHero";
import { getGalleryPhotos } from "@/lib/storage";
import { GalleryPhoto } from "@/types/testimonials";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import heroImage from "@/assets/hero-home.png";

const Gallery = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const allPhotos = getGalleryPhotos()
      .filter((p) => p.status === "active")
      .sort((a, b) => a.order - b.order);
    setPhotos(allPhotos);
  }, []);

  const categories = ["All", ...new Set(photos.map((p) => p.category).filter(Boolean))];
  
  const filteredPhotos = activeCategory === "All" 
    ? photos 
    : photos.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <PageHero
        title="Gallery"
        subtitle="A visual journey through aviation, training, and life moments"
        backgroundImage={heroImage}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as string)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold">{photo.title}</h3>
                    {photo.category && (
                      <span className="text-white/70 text-sm">{photo.category}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No photos available in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-none">
          <DialogTitle className="sr-only">{selectedPhoto?.title}</DialogTitle>
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          {selectedPhoto && (
            <div className="relative">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-white text-xl font-semibold">{selectedPhoto.title}</h3>
                {selectedPhoto.description && (
                  <p className="text-white/70 mt-1">{selectedPhoto.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;
