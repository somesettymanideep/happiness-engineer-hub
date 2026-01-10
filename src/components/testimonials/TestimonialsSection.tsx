import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, User, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getTextTestimonials } from "@/lib/storage";
import { TextTestimonial } from "@/types/testimonials";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<TextTestimonial[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    const data = getTextTestimonials()
      .filter((t) => t.status === "active")
      .sort((a, b) => a.order - b.order);
    setTestimonials(data);
  }, []);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          label="Testimonials"
          title="What People Say"
          description="Hear from those who have transformed their lives through our sessions."
        />

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <div className="bg-card p-6 rounded-2xl shadow-soft border border-border relative group hover:shadow-card transition-shadow h-full">
                    <Quote className="w-8 h-8 text-accent/30 absolute top-4 right-4" />
                    
                    <div className="flex items-center gap-3 mb-4">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-accent" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        {testimonial.designation && (
                          <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      "{testimonial.review}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
