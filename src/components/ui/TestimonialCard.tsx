"use client";

import Image from 'next/image';
import type { Testimonial } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, UserCircle } from 'lucide-react'; // UserCircle for placeholder avatar

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full bg-card shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-6 bg-muted/30">
        {testimonial.userImage ? (
          <Image
            src={testimonial.userImage}
            alt={`Foto de ${testimonial.userName}`}
            width={48}
            height={48}
            className="rounded-full"
            data-ai-hint="person portrait"
          />
        ) : (
          <UserCircle className="h-12 w-12 text-muted-foreground" />
        )}
        <div>
          <CardTitle className="text-lg font-semibold text-primary">{testimonial.userName}</CardTitle>
          {testimonial.coffeeReviewed && (
            <p className="text-xs text-muted-foreground">Probó: {testimonial.coffeeReviewed}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
            />
          ))}
        </div>
        <p className="text-sm text-foreground italic">&quot;{testimonial.text}&quot;</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 text-xs text-muted-foreground">
        <p>Publicado el {new Date().toLocaleDateString('es-CO')}</p> {/* Placeholder for actual date */}
      </CardFooter>
    </Card>
  );
}