import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Mock data, in a real app this would be fetched based on slug
const mockPost = {
    slug: "como-preparar-cafe-de-olla",
    title: "El Secreto de la Abuela: Cómo Preparar un Auténtico Café de Olla",
    excerpt: "Redescubre el sabor tradicional del campo con esta guía para preparar un café de olla especiado y reconfortante.",
    imageUrl: "https://placehold.co/1200x600.png",
    category: "Recetas Tradicionales",
    date: "20 Julio, 2024",
    author: {
        name: "Equipo Café Regional",
        avatarUrl: "https://placehold.co/100x100.png"
    },
    content: `
<p>El café de olla es más que una bebida; es un abrazo cálido que nos recuerda a las cocinas de las abuelas, al campo y a las tradiciones más arraigadas. Su preparación artesanal en una olla de barro le confiere un sabor único e inconfundible. ¡Aprende a prepararlo y llena tu hogar con su delicioso aroma!</p>
<p>Esta receta tradicional es perfecta para mañanas frías, tardes de lluvia o para compartir después de una buena comida.</p>
<h3 class="font-lora text-xl font-semibold mt-6 mb-2">Ingredientes que Necesitarás</h3>
<ul class="list-disc list-inside space-y-2 mb-4">
    <li>4 tazas de agua</li>
    <li>3 cucharadas soperas de café molido grueso (idealmente de nuestra selección de tueste oscuro)</li>
    <li>1 cono de piloncillo (panela) o al gusto</li>
    <li>1 raja de canela</li>
    <li>Opcional: 1 anís estrella o un clavo de olor para un toque extra de especias.</li>
    <li>Opcional: la cáscara de media naranja.</li>
</ul>
<h3 class="font-lora text-xl font-semibold mt-6 mb-2">Preparación Paso a Paso</h3>
<p>El secreto está en la paciencia y el amor que le pongas.</p>
<ol class="list-decimal list-inside space-y-2 mb-4">
    <li><strong>Calienta el agua:</strong> En una olla de barro (si es posible), pon a calentar el agua junto con el piloncillo y la canela. Si usas otros ingredientes opcionales como el anís o la cáscara de naranja, añádelos también en este paso.</li>
    <li><strong>Infusiona los sabores:</strong> Lleva el agua a ebullición y luego baja el fuego, permitiendo que hierva suavemente durante unos 5 minutos. Esto ayudará a que el piloncillo se disuelva por completo y el agua se impregne con el delicioso sabor de las especias.</li>
    <li><strong>Añade el café:</strong> Retira la olla del fuego y agrega el café molido. Remueve suavemente para que se integre bien con el agua especiada.</li>
    <li><strong>Reposa:</strong> Tapa la olla y deja que el café repose durante 5 a 7 minutos. Este paso es crucial para que el café libere todo su sabor sin volverse amargo.</li>
    <li><strong>Cuela y sirve:</strong> Con mucho cuidado, pasa el café por un colador de malla fina para retirar los posos y las especias. Sírvelo caliente en tazas de barro para una experiencia auténtica.</li>
</ol>
<p>¡Y listo! Disfruta de un café de olla lleno de tradición y sabor. Puedes ajustar la cantidad de piloncillo y especias a tu gusto.</p>
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
                    data-ai-hint="cafe de olla"
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
