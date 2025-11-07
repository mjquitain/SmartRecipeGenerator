import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Card,
    Group,
    Modal,
    Paper,
    SimpleGrid,
    Stack,
    Tabs,
    Text,
    TextInput,
    Title,
    rem
} from '@mantine/core';
import { Blocks, ChefHat, Heart, Leaf, Plus, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState, type ChangeEvent } from 'react';
import { ingredients as mockIngredients } from '../../data/mock_ingredients_data';

interface QuickStat {
    icon: React.ElementType;
    label: string;
    value: string;
    color: string;
}

function DashboardPage() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [defaultRecipes, setDefaultRecipes] = useState<any[]>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [expiringIngredients, setExpiringIngredients] = useState();
    const [suggestedRecipes, setSuggestedRecipes] = useState<any[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Suggested Recipe");


    const fetchRecipes = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=");
            const data = await response.json();

            if (data.meals) {
                setDefaultRecipes(data.meals);
                setRecipes([]);
            } else {
                setDefaultRecipes([]);
                setRecipes([]);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
            setDefaultRecipes([]);
            setRecipes([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRecipesByIngredients = async (): Promise<void> => {
        setHasSearched(true);
        setActiveTab("Generated Recipes");

        if (ingredients.length === 0) {
            setRecipes([]);
            return;
        }

        try {
            setIsLoading(true);

            const query = ingredients[0].trim().toLowerCase();
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`);
            const data = await response.json();

            if (!data.meals) {
                setRecipes([]);
                return;
            }

            if (ingredients.length > 1) {
                const detailedRecipes = await Promise.all(
                    data.meals.slice(0, 10).map(async (meal: any) => {
                        const detailRes = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                        const detailData = await detailRes.json();
                        return detailData.meals ? detailData.meals[0] : null;
                    })
                );

                const filtered = detailedRecipes.filter((recipe) => {
                    if (!recipe) return false;
                    const recipeIngredients = Array.from({ length: 20 }, (_, i) => recipe[`strIngredient${i + 1}`])
                        .filter(Boolean)
                        .map((ing) => ing.toLowerCase());

                    return ingredients.every((ing) =>
                        recipeIngredients.some((ri) => ri.includes(ing.toLowerCase()))
                    );
                });

                setRecipes(filtered);
            } else {
                setRecipes(data.meals);
            }

        } catch (error) {
            console.error("Error fetching recipes by ingredients:", error);
            setRecipes([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSuggestedRecipes = async (): Promise<void> => {
        try {
            setIsLoading(true);

            const today = new Date();
            const soonExpiring = mockIngredients
                .filter(item => {
                    const expiry = new Date(item.expiryDate);
                    const daysToExpire = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
                    return daysToExpire <= 3 && daysToExpire >= 0;
                })
                .map(item => item.name.toLowerCase());

            setExpiringIngredients(soonExpiring);

            if (soonExpiring.length === 0) {
                setSuggestedRecipes([]);
                return;
            }

            const allMeals: any[] = [];
            for (const ingredient of soonExpiring) {
                const response = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
                );
                const data = await response.json();
                if (data.meals) allMeals.push(...data.meals);
            }

            const uniqueMeals = Array.from(
                new Map(allMeals.map(meal => [meal.idMeal, meal])).values()
            );

            setSuggestedRecipes(uniqueMeals);
        } catch (error) {
            console.error("Error fetching suggested recipes:", error);
            setSuggestedRecipes([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
        fetchSuggestedRecipes();
    }, []);

    const addIngredient = (): void => {
        if (currentIngredient.trim() !== "") {
            setIngredients((prev) => [...prev, currentIngredient.trim()]);
            setCurrentIngredient("");
        }
    };

    const removeIngredient = (index: number): void => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
        if (hasSearched) {
            setRecipes([]);
        }
    };

    const recipesFound = defaultRecipes.length;
    const ingredientsAvailable = mockIngredients.length;

    const quickStats: QuickStat[] = [
        { icon: ChefHat, label: "Recipes Found", value: recipesFound.toString(), color: "#8a9a7b" },
        { icon: Heart, label: "Saved Recipes", value: "0", color: "#8a9a7b" },
        { icon: Leaf, label: "Ingredients Available", value: ingredientsAvailable.toString(), color: "#8a9a7b" },
    ];

    const openRecipeModal = async (idMeal: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const data = await response.json();
            if (data.meals && data.meals.length > 0) {
                setSelectedRecipe(data.meals[0]);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching recipe details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack
            align={"center"}
            style={{ backgroundColor: "#f8f9f8" }}
            mih={"100vh"}
            w={"100%"}
        >
            <Stack
                w={"100%"}
                maw={rem(1655)}
                p={"xl"}
                gap={"xs"}
            >
                <SimpleGrid cols={3} spacing="lg" mb={"lg"}>
                    {quickStats.map((stat, index) => (
                        <Card
                            key={index}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            style={{ borderColor: '#e8f0e8' }}
                        >
                            <Group>
                                <Box
                                    style={{
                                        backgroundColor: stat.color + '20',
                                        padding: '12px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <stat.icon size={24} color={stat.color} />
                                </Box>
                                <div>
                                    <Text size="xl" fw={700} style={{ color: '#2d3319' }}>
                                        {stat.value}
                                    </Text>
                                    <Text size="sm" c="dimmed" style={{ color: '#5a6b4f' }}>
                                        {stat.label}
                                    </Text>
                                </div>
                            </Group>
                        </Card>
                    ))}
                </SimpleGrid>
                <Paper
                    shadow="sm"
                    p="xl"
                    radius="md"
                    withBorder
                    style={{
                        backgroundColor: 'white',
                        borderColor: '#8a9a7b',
                        borderWidth: '2px',
                    }}
                    mb={30}
                >
                    <Stack gap="md">
                        <div>
                            <Title order={3} style={{ color: '#2d3319', marginBottom: 8 }}>
                                What ingredients do you have? 🥗
                            </Title>
                            <Text size="sm" c="dimmed" style={{ color: '#5a6b4f' }}>
                                Enter the ingredients you have at home and we'll suggest delicious recipes
                            </Text>
                        </div>

                        <Group>
                            <TextInput
                                placeholder="e.g., chicken, tomatoes, pasta..."
                                value={currentIngredient}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCurrentIngredient(e.currentTarget.value)
                                }
                                style={{ flex: 1 }}
                                styles={{
                                    input: {
                                        borderColor: '#8a9a7b',
                                        '&:focus': {
                                            borderColor: '#6b7c5e',
                                        },
                                    },
                                }}
                            />
                            <Button
                                onClick={addIngredient}
                                leftSection={<Plus size={16} />}
                                styles={{
                                    root: {
                                        backgroundColor: '#8a9a7b',
                                        '&:hover': {
                                            backgroundColor: '#6b7c5e',
                                        },
                                    },
                                }}
                            >
                                Add Ingredient
                            </Button>
                        </Group>

                        {ingredients.length > 0 && (
                            <Box>
                                <Text size="sm" fw={500} mb="xs" style={{ color: '#2d3319' }}>
                                    Your ingredients ({ingredients.length}):
                                </Text>
                                <Group gap="xs">
                                    {ingredients.map((ingredient, index) => (
                                        <Badge
                                            key={index}
                                            size="lg"
                                            variant="light"
                                            style={{
                                                backgroundColor: '#8a9a7b20',
                                                color: '#2d3319',
                                                paddingRight: 3,
                                            }}
                                            rightSection={
                                                <ActionIcon
                                                    size="xs"
                                                    color="gray"
                                                    radius="xl"
                                                    variant="transparent"
                                                    onClick={() => removeIngredient(index)}
                                                >
                                                    <X size={14} />
                                                </ActionIcon>
                                            }
                                        >
                                            {ingredient}
                                        </Badge>
                                    ))}
                                </Group>
                            </Box>
                        )}

                        {ingredients.length > 0 && (
                            <>
                                <Button
                                    size="lg"
                                    fullWidth
                                    leftSection={<Search size={20} />}
                                    loading={isLoading}
                                    onClick={fetchRecipesByIngredients}
                                    styles={{
                                        root: {
                                            backgroundColor: '#6b7c5e',
                                            '&:hover': { backgroundColor: '#5a6b4f' },
                                        },
                                    }}
                                >
                                    Generate Recipe
                                </Button>

                                <Button
                                    size="sm"
                                    variant="light"
                                    color="gray"
                                    fullWidth
                                    mt="xs"
                                    onClick={() => {
                                        setIngredients([]);
                                        setRecipes(defaultRecipes);
                                        setCurrentIngredient("");
                                        setHasSearched(false);
                                    }}
                                >
                                    Clear Results
                                </Button>
                            </>
                        )}

                    </Stack>
                </Paper>

                <Tabs value={activeTab} onTabChange={setActiveTab}>
                    <Tabs.List justify='center' grow>
                        <Tabs.Tab value="Suggested Recipe" color={"#8a9a7b"}>
                            <Group justify='center'>
                                <ShoppingBag size={16} />
                                <Text style={{ fontSize: '16px', color: '#2d3319' }}>Suggested Recipe</Text>
                            </Group>
                        </Tabs.Tab>
                        <Tabs.Tab value="Generated Recipes" color={"#8a9a7b"}>
                            <Group justify='center'>
                                <Blocks size={16} />
                                <Text style={{ fontSize: '16px', color: '#2d3319' }}>Generated Recipes</Text>
                            </Group>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="Suggested Recipe" pt="xs">
                        <Paper
                            p="xl"
                            style={{
                                backgroundColor: 'white',
                                border: '2px dashed #e8f0e8',
                                borderRadius: '10px',
                                textAlign: 'center',
                                minHeight: '400px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {isLoading ? (
                                <Text ta="center" c="dimmed">
                                    Loading suggested recipes...
                                </Text>
                            ) : suggestedRecipes.length > 0 ? (
                                <Box w="100%">
                                    <Text size="md" fw={500} mb="md" style={{ color: "#2d3319" }}>
                                        Suggested recipes based on expiring ingredients: ({suggestedRecipes.length})
                                    </Text>
                                    <SimpleGrid cols={3} spacing="md">
                                        {suggestedRecipes.map((recipe) => (
                                            <Card
                                                key={recipe.idMeal}
                                                shadow="sm"
                                                radius="md"
                                                withBorder
                                                style={{ borderColor: "#e8f0e8" }}
                                            >
                                                <img
                                                    src={recipe.strMealThumb}
                                                    alt={recipe.strMeal}
                                                    style={{
                                                        width: "100%",
                                                        borderRadius: "8px",
                                                        marginBottom: "8px",
                                                    }}
                                                />
                                                <Text fw={500} style={{ color: "#2d3319", marginBottom: "8px" }}>
                                                    {recipe.strMeal}
                                                </Text>
                                                <Button color={"#8a9a7b"} onClick={() => openRecipeModal(recipe.idMeal)} mt={"auto"}>
                                                    View Recipe
                                                </Button>
                                            </Card>
                                        ))}
                                    </SimpleGrid>
                                </Box>
                            ) : (
                                <Text ta="center" c="dimmed" mt="sm">
                                    No recipes found for your expiring ingredients.
                                </Text>
                            )}
                        </Paper>
                    </Tabs.Panel>

                    <Tabs.Panel value="Generated Recipes" pt="xs">
                        <Paper
                            p="xl"
                            style={{
                                backgroundColor: 'white',
                                border: '2px dashed #e8f0e8',
                                borderRadius: '10px',
                                textAlign: 'center',
                                minHeight: '400px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text ta="center" c="dimmed">
                                {!hasSearched && ingredients.length === 0 && (
                                    <Text ta="center" c="dimmed">
                                        Generate recipes based on your ingredients!
                                    </Text>
                                )}

                                {isLoading && (
                                    <Text ta="center" c="dimmed" mt="sm">
                                        Loading recipes...
                                    </Text>
                                )}
                                {hasSearched && !isLoading && recipes.length > 0 && (
                                    <Box>
                                        <Text size="md" fw={500} mb="md" style={{ color: "#2d3319" }}>
                                            Recipes found: {recipes.length}
                                        </Text>

                                        <SimpleGrid cols={3} spacing="md">
                                            {recipes.map((recipe) => (
                                                <Card
                                                    key={recipe.idMeal}
                                                    shadow="sm"
                                                    radius="md"
                                                    withBorder
                                                    style={{ borderColor: "#e8f0e8" }}
                                                >
                                                    <img
                                                        src={recipe.strMealThumb}
                                                        alt={recipe.strMeal}
                                                        style={{
                                                            width: "100%",
                                                            borderRadius: "8px",
                                                            marginBottom: "8px",
                                                        }}
                                                    />
                                                    <Text fw={500} style={{ color: "#2d3319", marginBottom: "8px" }}>
                                                        {recipe.strMeal}
                                                    </Text>
                                                    <Button color={"#8a9a7b"} onClick={() => openRecipeModal(recipe.idMeal)} mt={"auto"}>
                                                        View Recipe
                                                    </Button>
                                                </Card>
                                            ))}
                                        </SimpleGrid>
                                    </Box>
                                )}

                                {hasSearched && !isLoading && recipes.length === 0 && ingredients.length > 0 && (
                                    <Text ta="center" c="dimmed" mt="sm">
                                        No recipes found for your selected ingredients.
                                    </Text>
                                )}
                                {hasSearched && !isLoading && ingredients.length === 0 && (
                                    <Text ta="center" c="dimmed" mt="sm">
                                        Please add ingredients and click "Generate Recipe".
                                    </Text>
                                )}
                            </Text>
                        </Paper>
                    </Tabs.Panel>
                </Tabs>
                <Modal
                    opened={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={<Text tt="capitalize" fw={500} size="xl">{selectedRecipe?.strMeal}</Text>}
                    size="lg"
                    centered
                >
                    {selectedRecipe ? (
                        <Box>
                            <img
                                src={selectedRecipe.strMealThumb}
                                alt={selectedRecipe.strMeal}
                                style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
                            />
                            <Text fw={500} mb="xs">Category: {selectedRecipe.strCategory}</Text>
                            <Text fw={500} mb="xs">Area: {selectedRecipe.strArea}</Text>

                            <Text mt="sm" fw={600} mb="xs" style={{ color: "#2d3319" }}>Ingredients:</Text>
                            <ul style={{ paddingLeft: "20px" }}>
                                {Array.from({ length: 20 }, (_, i) => i + 1)
                                    .map(i => {
                                        const ingredient = selectedRecipe[`strIngredient${i}`];
                                        const measure = selectedRecipe[`strMeasure${i}`];
                                        return ingredient && ingredient.trim() !== "" ? (
                                            <li key={i}>{ingredient} - {measure}</li>
                                        ) : null;
                                    })}
                            </ul>

                            <Text mt="md" fw={600} mb="xs" style={{ color: "#2d3319" }}>Instructions:</Text>
                            <Text size="sm" style={{ whiteSpace: "pre-line", color: "#5a6b4f" }}>
                                {selectedRecipe.strInstructions}
                            </Text>

                            {selectedRecipe.strYoutube && (
                                <Box mt="md">
                                    <Text fw={600} mb="xs">Watch Tutorial:</Text>
                                    <a href={selectedRecipe.strYoutube} target="_blank" rel="noopener noreferrer">
                                        {selectedRecipe.strYoutube}
                                    </a>
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </Modal>
            </Stack>
        </Stack>
    );
}

export default DashboardPage;