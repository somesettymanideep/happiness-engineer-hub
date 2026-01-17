import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { getVideoTestimonials } from "@/lib/storage";
import { VideoTestimonial } from "@/types/testimonials";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Helper to extract video ID
const getYouTubeVideoId = (url: string): string | null => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  return match ? match[1] : null;
};

const getVimeoVideoId = (url: string): string | null => {
  const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  return match ? match[1] : null;
};

// Helper to create embed URL
const getEmbedUrl = (url: string): string => {
  const youtubeId = getYouTubeVideoId(url);
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
  }

  const vimeoId = getVimeoVideoId(url);
  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}`;
  }

  return url;
};

// Helper to get YouTube thumbnail
const getYouTubeThumbnail = (url: string): string | null => {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return null;
};

export const VideoTestimonialsCarousel = () => {
  const [testimonials, setTestimonials] = useState<VideoTestimonial[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const data = getVideoTestimonials()
      .filter((t) => t.status === "active")
      .sort((a, b) => a.order - b.order);
    setTestimonials(data);
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          label="Video Testimonials"
          title="Success Stories"
          description="Watch real stories of transformation and growth."
        />

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border">
                    <div className="relative aspect-video bg-muted">
                      {activeVideo === testimonial.id ? (
                        <iframe
                          src={`${getEmbedUrl(testimonial.videoUrl)}?autoplay=1`}
                          title={`${testimonial.name} testimonial`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      ) : (
                        <button
                          onClick={() => setActiveVideo(testimonial.id)}
                          className="absolute inset-0 w-full h-full flex items-center justify-center group"
                        >
                          {getYouTubeThumbnail(testimonial.videoUrl) ? (
                            <img
                              src={getYouTubeThumbnail(testimonial.videoUrl)!}
                              alt={`${testimonial.name} video thumbnail`}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 w-full h-full bg-primary/80" />
                          )}
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                          <div className="relative w-16 h-16 rounded-full bg-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-primary fill-current ml-1" />
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      {testimonial.designation && (
                        <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden md:flex z-10 bg-background shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex z-10 bg-background shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className="w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-accent transition-colors"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
