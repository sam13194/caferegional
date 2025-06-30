import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock blog posts
const blogPosts = [
  {
    id: "1",
    slug: "como-preparar-cafe-de-olla",
    title: "El Secreto de la Abuela: Cómo Preparar un Auténtico Café de Olla",
    excerpt: "Redescubre el sabor tradicional del campo con esta guía para preparar un café de olla especiado y reconfortante.",
    imageUrl: "https://placehold.co/600x400.png",
    category: "Recetas Tradicionales",
    date: "20 Julio, 2024",
    author: "Equipo Café Regional",
  },
  {
    id: "2",
    slug: "origenes-cafe-colombiano-ragonvalia",
    title: "Explorando los Orígenes: El Café de Ragonvalia",
    excerpt: "Sumérgete en la historia y las características únicas del café cultivado en las montañas de Ragonvalia, Norte de Santander...",
    imageUrl: "https://placehold.co/600x400.png",
    category: "Orígenes del Café",
    date: "15 Julio, 2024",
    author: "Equipo Café Regional",
  },
  {
    id: "3",
    slug: "sostenibilidad-cultivo-cafe",
    title: "Sostenibilidad en el Cultivo del Café: Nuestro Compromiso",
    excerpt: "Conoce cómo en Café Regional trabajamos por un futuro más verde y justo para nuestros caficultores y el planeta...",
    imageUrl: "https://placehold.co/600x400.png",
    category: "Sostenibilidad",
    date: "10 Julio, 2024",
    author: "Equipo Café Regional",
  },
];

const categories = ["Recetas Tradicionales", "Guías de Preparación", "Orígenes del Café", "Sostenibilidad", "Noticias de Café Regional"];

export default function BlogPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="font-lora text-4xl md:text-5xl font-bold text-primary mb-4">Un Viaje por el Café</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Artículos, guías y noticias para profundizar tu conocimiento y amor por el café colombiano.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Blog Posts */}
        <main className="w-full md:w-3/4 space-y-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image 
                  src={post.imageUrl} 
                  alt={post.title} 
                  layout="fill" 
                  objectFit="cover"
                  data-ai-hint={post.slug === 'como-preparar-cafe-de-olla' ? 'cafe de olla' : 'coffee article'}
                />
              </div>
              <div className="md:w-2/3 flex flex-col">
                <CardHeader>
                  <CardTitle className="font-lora text-xl text-primary hover:underline">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Por {post.author} | {post.date} | <span className="text-primary">{post.category}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/blog/${post.slug}`} passHref>
                    <Button variant="link" className="p-0 h-auto text-primary group">
                      Leer Más <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </div>
            </Card>
          ))}
           {/* Pagination placeholder */}
          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="mr-2">Anterior</Button>
            <Button>1</Button>
            <Button variant="outline" className="ml-2">Siguiente</Button>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full md:w-1/4 space-y-6 self-start">
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h3 className="font-lora text-lg font-semibold mb-3 text-primary">Buscar en el Blog</h3>
            <div className="flex gap-2">
              <Input placeholder="Palabras clave..." className="bg-background" />
              <Button variant="outline" size="icon"><Search className="h-4 w-4"/></Button>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h3 className="font-lora text-lg font-semibold mb-3 text-primary">Categorías</h3>
            <ul className="space-y-1 text-sm">
              {categories.map(cat => (
                <li key={cat}>
                  <Link href="#" className="text-muted-foreground hover:text-primary block py-1">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h3 className="font-lora text-lg font-semibold mb-3 text-primary">Artículos Recientes</h3>
            <ul className="space-y-2 text-sm">
              {blogPosts.slice(0,3).map(post => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="text-muted-foreground hover:text-primary block leading-tight">{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
