"use client";

import { useEffect, useState } from 'react';
import { coffeeRecommendation, type CoffeeRecommendationInput, type CoffeeRecommendationOutput } from '@/ai/flows/coffee-recommendation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertTriangle, Lightbulb } from 'lucide-react';
import type { Product } from '@/types'; // Assuming Product type is defined

interface CoffeeRecommenderProps {
  currentProduct?: Product; // Optional: current product being viewed
  userPurchaseHistory?: string; // Comma-separated list of product names
  userPreferences?: string; // Text description of preferences
}

export default function CoffeeRecommender({ currentProduct, userPurchaseHistory, userPreferences }: CoffeeRecommenderProps) {
  const [recommendation, setRecommendation] = useState<CoffeeRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    let history = userPurchaseHistory || "";
    if (currentProduct && !history.includes(currentProduct.name)) {
        history = history ? `${history}, ${currentProduct.name}` : currentProduct.name;
    }
    
    const preferences = userPreferences || (currentProduct ? `Interesado en cafés similares a ${currentProduct.name} de la región ${currentProduct.origin}.` : "Busca cafés colombianos de alta calidad.");

    const input: CoffeeRecommendationInput = {
      userPurchaseHistory: history,
      userPreferences: preferences,
    };

    try {
      const result = await coffeeRecommendation(input);
      setRecommendation(result);
    } catch (e) {
      console.error("Error fetching recommendations:", e);
      setError("No se pudieron obtener recomendaciones en este momento. Intenta más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  // Optionally, fetch recommendations on component mount if inputs are provided
   useEffect(() => {
     if (userPurchaseHistory || userPreferences || currentProduct) {
       fetchRecommendations();
     }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentProduct?.id]); // Re-fetch if current product changes

  return (
    <Card className="w-full bg-background/70 shadow-lg">
      <CardHeader>
        <CardTitle className="font-lora text-xl flex items-center">
          <Lightbulb className="mr-2 h-6 w-6 text-primary" />
          Sugerencias Personalizadas
        </CardTitle>
        <CardDescription>
          Basado en tus gustos y el café actual, podríamos recomendarte:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            Buscando recomendaciones...
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center justify-center py-6 text-destructive">
            <AlertTriangle className="h-8 w-8 mr-2 mb-2" />
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
            <Button onClick={fetchRecommendations} variant="outline" size="sm" className="mt-4">Reintentar</Button>
          </div>
        )}
        {recommendation && !isLoading && !error && (
          recommendation.recommendedCoffees === "No disponible" ? (
            <div className="flex items-center text-muted-foreground text-sm">
                <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                <p>{recommendation.reasoning}</p>
            </div>
          ) : (
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-foreground">Cafés Recomendados:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                {recommendation.recommendedCoffees.split(',').map(coffee => coffee.trim()).filter(coffee => coffee).map((coffee, index) => (
                  <li key={index}>{coffee}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Por qué te gustarían:</h4>
              <p className="text-sm text-muted-foreground italic">{recommendation.reasoning}</p>
            </div>
          </div>
          )
        )}
        {(!isLoading && !recommendation && !error) && (
             <div className="text-center py-4">
                <p className="text-muted-foreground text-sm">Haz clic para obtener recomendaciones.</p>
                <Button onClick={fetchRecommendations} variant="default" size="sm" className="mt-2">
                    Obtener Sugerencias
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
