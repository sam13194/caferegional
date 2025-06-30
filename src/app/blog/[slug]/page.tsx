import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// In a real app, this data would come from a CMS or database
const allPosts = [
    {
        slug: "como-preparar-cafe-de-olla",
        title: "El Secreto de la Abuela: Cómo Preparar un Auténtico Café de Olla",
        excerpt: "Redescubre el sabor tradicional del campo con esta guía para preparar un café de olla especiado y reconfortante.",
        imageUrl: "https://i.postimg.cc/5tLn50JG/image-6.png",
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
    },
    {
        slug: "ragonvalia-cafe-especialidad",
        title: "Ragonvalia: El Pequeño Pueblo Colombiano que Conquistó el Mundo con su Café de Especialidad",
        excerpt: "En el corazón de Norte de Santander, Colombia, un pequeño municipio llamado Ragonvalia está redefiniendo el panorama del café de especialidad.",
        imageUrl: "https://i.postimg.cc/PfPSfhVB/cafe-ragonvalia.jpg",
        category: "Orígenes del Café",
        date: "25 Julio, 2024",
        author: {
            name: "Equipo Café Regional",
            avatarUrl: "https://placehold.co/100x100.png"
        },
        content: `
<p>En el corazón de Norte de Santander, Colombia, un pequeño municipio llamado Ragonvalia está redefiniendo el panorama del café de especialidad. Lejos de ser un productor más, esta región ha emergido como un epicentro de calidad, impulsada por la visión y la dedicación de caficultores que han llevado sus granos a los escenarios internacionales más prestigiosos.</p>
<h3 class="font-lora text-xl font-semibold mt-6 mb-2">La Historia de Domingo Torres: Fe, Piedra y Café Geisha</h3>
<p>La narrativa de Ragonvalia no puede contarse sin la inspiradora historia de Domingo Torres, un caficultor de la Finca El Roble. Su viaje es un testimonio de perseverancia: desde sus inicios en Guapi, Cauca, hasta establecerse en Ragonvalia, donde, contra todo pronóstico y las advertencias de sus vecinos sobre la "tierra pura piedra", decidió apostar por el café.</p>
<p>La clave de su éxito reside en varios factores. Primero, el terroir único de su Finca El Roble, ubicada a 1.920 metros sobre el nivel del mar (M.S.N.M.). Esta altitud es ideal para el café Arábica, permitiendo una maduración lenta que concentra azúcares y precursores del sabor. Además, Torres destaca la composición rocosa de su suelo, que retiene nutrientes y minerales esenciales para las plantas.</p>
<p>La decisión más audaz de Torres fue cultivar la variedad Geisha, conocida mundialmente por su excepcional perfil en taza y alto valor de mercado. A pesar de las críticas iniciales de vecinos y expertos por su susceptibilidad a la roya, Torres, con su conocimiento, sabía que a más de 1.800 metros de altitud, la incidencia de esta enfermedad se reduce drásticamente. Sus métodos de procesamiento, aunque él los describe como "básicos" y "pura mano", son meticulosos: un proceso lavado con una fermentación precisa de 36 horas y secado en marquesina. Esta combinación de terroir, variedad y procesamiento artesanal es lo que ha catapultado su café a la élite.</p>
<h3 class="font-lora text-xl font-semibold mt-6 mb-2">Un Perfil Sensorial Inolvidable</h3>
<p>El café Geisha de Domingo Torres es una experiencia para los sentidos. Ha sido consistentemente elogiado por su equilibrio y complejidad. En el concurso "Colombia, Tierra de Diversidad", fue un "cuádruple ganador", reconocido como el mejor en Acidez, Cuerpo y Balance, además de ser coronado como el café "más exótico".</p>
<p>Las notas de cata revelan un perfil vibrante: toques cítricos, frutos rojos y vainilla. Al beberlo, se perciben matices de romero y limoncillo, culminando en un persistente residual a lima. Su acidez jugosa y cuerpo sedoso contribuyen a una impresión general de armonía. Torres mismo insiste en que su café debe disfrutarse sin azúcar para apreciar plenamente sus cualidades inherentes.</p>
<h3 class="font-lora text-xl font-semibold mt-6 mb-2">De Ragonvalia al Mundo: Premios y Precios Récord</h3>
<p>El reconocimiento internacional del café de Ragonvalia, liderado por Domingo Torres, es innegable. En una subasta internacional en el marco de la Feria del Café del Nororiente Colombiano, su café alcanzó un precio histórico de 120.50 USD por libra, el más alto entre 27 lotes finalistas. Este lote récord fue adquirido por Koffee Kult, una empresa de Estados Unidos. Otro de sus lotes también logró un impresionante precio de 93.50 USD por libra en la misma subasta.</p>
<p>Estos logros no son aislados. En una subasta anterior, su café alcanzó los 78 USD por libra, y ha sido consistentemente el productor con las ventas más altas a nivel nacional de 2021 a 2023. El café de Torres se exporta a mercados tan diversos como China, Corea del Sur, Taiwán, Estados Unidos, Bélgica y Canadá. Incluso en Colombia, la tostadora Amor Perfecto ha ofrecido ediciones limitadas de su café.</p>
<p>Estos precios récord no solo son un motivo de orgullo, sino que se traducen directamente en "mejores ingresos y en prosperidad para las familias que los producen", demostrando el impacto económico transformador del café de especialidad.</p>
<h3 class="font-lora text-xl font-semibold mt-6 mb-2">El Futuro Prometedor de la Caficultura en Ragonvalia</h3>
<p>El futuro de la caficultura en Ragonvalia se vislumbra prometedor. La Gobernación de Norte de Santander ha invertido 15.100 millones de COP en el proyecto "Restauración de la Caficultura", buscando beneficiar a más de 3.400 caficultores y renovar 2.404 hectáreas. Además, el SENA ofrece un programa de "Técnico en Producción de Cafés Especiales" en el municipio, formando a las nuevas generaciones.</p>
<p>Si bien persisten desafíos, como la necesidad de mejorar la infraestructura y las herramientas para los caficultores, el éxito de Domingo Torres es un faro de inspiración. Con un impresionante 92% del café acopiado en Norte de Santander clasificado como "café especial", la región tiene una base sólida para seguir creciendo. Domingo Torres cree firmemente que Ragonvalia tiene el potencial para que otros caficultores produzcan cafés "buenos e incluso mejores" que el suyo, dada la calidad de la tierra.</p>
<p>La historia de Ragonvalia y Domingo Torres es un poderoso recordatorio de que la excelencia, la innovación y la dedicación pueden transformar una pequeña comunidad cafetera en un actor global, llevando el sabor de Colombia a cada rincón del mundo.</p>
`
    },
    {
        slug: "sostenibilidad-cultivo-cafe",
        title: "Sostenibilidad en el Cultivo del Café: Nuestro Compromiso",
        excerpt: "Conoce cómo en Café Regional trabajamos por un futuro más verde y justo para nuestros caficultores y el planeta.",
        imageUrl: "https://i.postimg.cc/pdR2xmsY/DALL-E-2025-02-11-17-47-59-Create-a-coffee-label-design-featuring-the-name-CAF-REGIONAL-ARBOLEDA.webp",
        category: "Sostenibilidad",
        date: "10 Julio, 2024",
        author: {
            name: "Equipo Café Regional",
            avatarUrl: "https://placehold.co/100x100.png"
        },
        content: `
<p>La sostenibilidad no es solo una palabra de moda para nosotros; es el núcleo de nuestra filosofía. En Café Regional, creemos que un café excepcional solo puede provenir de un ecosistema saludable y de comunidades prósperas. Nuestro compromiso se extiende desde la semilla hasta tu taza, asegurando que cada grano sea un testimonio de nuestro respeto por la tierra y por las manos que lo cultivan.</p>
<h3 class="font-lora text-xl font-semibold mt-6 mb-2">Prácticas Agrícolas Amigables</h3>
<p>Trabajamos codo a codo con nuestros aliados caficultores para implementar prácticas agrícolas que protegen la biodiversidad. Esto incluye:</p>
<ul class="list-disc list-inside space-y-2 mb-4">
    <li><strong>Cultivo bajo sombra:</strong> Fomentamos el cultivo de café bajo la sombra de árboles nativos, lo que crea un hábitat para la fauna local y mejora la calidad del suelo.</li>
    <li><strong>Manejo responsable del agua:</strong> Implementamos técnicas de beneficio ecológico que reducen significativamente el consumo de agua y evitan la contaminación de las fuentes hídricas.</li>
    <li><strong>Reducción de químicos:</strong> Priorizamos el uso de abonos orgánicos y métodos de control de plagas naturales para mantener la salud del ecosistema.</li>
</ul>
<h3 class="font-lora text-xl font-semibold mt-6 mb-2">Comercio Justo y Desarrollo Comunitario</h3>
<p>Un futuro sostenible también significa un futuro justo para nuestros caficultores. Nos enorgullece:</p>
<ol class="list-decimal list-inside space-y-2 mb-4">
    <li><strong>Pagar precios justos:</strong> Ofrecemos precios por encima del mercado que reconocen la calidad y el arduo trabajo de las familias caficultoras.</li>
    <li><strong>Construir relaciones a largo plazo:</strong> Creemos en alianzas duraderas basadas en la confianza y el respeto mutuo, no en transacciones únicas.</li>
    <li><strong>Invertir en la comunidad:</strong> Parte de nuestros ingresos se reinvierte en proyectos locales que mejoran la educación, la salud y la infraestructura en las regiones donde trabajamos.</li>
</ol>
<p>Cada vez que disfrutas de una taza de Café Regional, no solo estás saboreando un producto de alta calidad, sino que también estás apoyando un modelo de negocio que cuida a las personas y al planeta. ¡Gracias por ser parte de este viaje sostenible!</p>
        `
    }
];

function getPostBySlug(slug: string) {
    return allPosts.find(post => post.slug === slug);
}


export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto py-8 max-w-3xl">
            <div className="mb-8">
                <Link href="/blog" className="inline-flex items-center text-primary hover:underline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Artículos
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
                    data-ai-hint="cafe article"
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
