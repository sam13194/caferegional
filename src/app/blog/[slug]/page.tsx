import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mock data, in a real app this would be fetched based on slug
const mockPost = {
    slug: "guia-preparacion-v60",
    title: "Guía Completa para Preparar Café en V60 como un Profesional",
    excerpt: "Descubre los secretos para una extracción perfecta en tu V60 y disfruta de una taza limpia y llena de matices...",
    imageUrl: "https://placehold.co/1200x600.png",
    category: "Guías de Preparación",
    date: "20 Julio, 2024",
    author: {
        name: "Equipo Café Regional",
        avatarUrl: "https://placehold.co/100x100.png"
    },
    content: `
<p>Preparar café en un Hario V60 es tanto un arte como una ciencia. Este método de goteo, originario de Japón, es famoso por producir una taza increíblemente limpia, brillante y llena de matices, permitiendo que las características únicas de cada grano de café resalten.</p>
<p>Aquí te guiaremos paso a paso para que domines la técnica y puedas disfrutar de un café excepcional en casa.</p>
<h3 class="font-lora text-xl font-semibold mt-6 mb-2">¿Qué Necesitarás?</h3>
<ul class="list-disc list-inside space-y-2 mb-4">
    <li>Hario V60 (cerámica, plástico o metal)</li>
    <li>Filtros de papel para V60</li>
    <li>Café de especialidad de tueste medio (como nuestro Café Excelso Ragonvalia)</li>
    <li>Molinillo de café (preferiblemente de muelas)</li>
    <li>Balanza digital con temporizador</li>
    <li>Hervidor de agua con cuello de ganso</li>
    <li>Tu taza favorita</li>
</ul>
<h3 class="font-lora text-xl font-semibold mt-6 mb-2">La Receta Base</h3>
<p>Utilizaremos una ratio de 1:16, que es un excelente punto de partida. Esto significa 1 gramo de café por cada 16 mililitros (o gramos) de agua.</p>
<ul class="list-disc list-inside space-y-2 mb-4">
    <li><strong>Café:</strong> 20 gramos</li>
    <li><strong>Agua:</strong> 320 gramos (o ml)</li>
    <li><strong>Temperatura del agua:</strong> 92-96°C</li>
    <li><strong>Molienda:</strong> Media-fina, similar a la sal de mesa.</li>
    <li><strong>Tiempo de extracción total:</strong> 2:30 - 3:00 minutos</li>
</ul>
    `
};


export default function BlogPostPage({ params }: { params: { slug: string } }) {

    // In a real app, you would fetch the post data using the slug
    // const post = await getPostBySlug(params.slug);
    const post = mockPost;

    if (!post) {
        return <div>Post no encontrado</div>
    }

    return (
        <article className="container mx-auto py-8 max-w-3xl">
            <div className="mb-8">
                <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al Blog
                </Link>
            </div>

            <header className="mb-8">
                <Badge className="mb-2">{post.category}</Badge>
                <h1 className="font-lora text-3xl md:text-4xl font-bold text-primary mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{post.author.name}</span>
                    </div>
                    <span>{post.date}</span>
                </div>
            </header>

            <div className="relative aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
                <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    layout="fill" 
                    objectFit="cover" 
                    priority
                    data-ai-hint="coffee blog specific"
                />
            </div>

            <div 
                className="prose prose-lg max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <Separator className="my-12"/>

            <footer className="text-center">
                <h3 className="font-lora text-xl font-semibold text-primary mb-4">¿Te gustó este artículo?</h3>
                <p className="text-muted-foreground mb-4">¡Compártelo con otros amantes del café!</p>
                {/* Placeholder for social share buttons */}
                <div className="flex justify-center gap-4">
                    <Button variant="outline">Facebook</Button>
                    <Button variant="outline">Twitter</Button>
                    <Button variant="outline">Copiar Enlace</Button>
                </div>
            </footer>
        </article>
    )
}
