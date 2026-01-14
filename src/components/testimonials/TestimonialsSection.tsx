import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";
import { getTextTestimonials } from "@/lib/storage";
import { TextTestimonial } from "@/types/testimonials";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<TextTestimonial[]>([]);

  useEffect(() => {
    const data = getTextTestimonials()
      .filter((t) => t.status === "active")
      .sort((a, b) => a.order - b.order);
    setTestimonials(data);
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          label="Testimonials"
          title="What People Say"
          description="Hear from those who have transformed their lives through our sessions."
        />

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-2xl shadow-soft border border-border relative group hover:shadow-card transition-shadow h-full"
                >
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
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
