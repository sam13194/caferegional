"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Region } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface RegionCardProps {
  region: Region;
}

export default function RegionCard({ region }: RegionCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={region.imageUrl}
            alt={`Paisaje de ${region.name}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint="coffee landscape"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-lora text-2xl mb-2 text-primary">{region.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">{region.shortDescription}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/regions/${region.slug}`} legacyBehavior passHref>
          <Button variant="default" className="w-full group">
            Ver Cafés de {region.name}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}