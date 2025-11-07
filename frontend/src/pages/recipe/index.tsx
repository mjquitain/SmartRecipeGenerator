import {
    Badge,
    Box,
    Button,
    Card,
    Divider,
    Flex,
    Group,
    Paper,
    rem,
    Select,
    SimpleGrid,
    Stack,
    Tabs,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import { Blocks, BookHeart, Plus, Save } from "lucide-react";
import { useState } from "react";
import { ingredients } from "../../data/mock_ingredients_data";

interface Ingredient {
    id: number | string;
    name: string;
}


function RecipePage() {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

    const toggleIngredient = (ingredientName: string) => {
        setSelectedIngredients((prev) =>
            prev.includes(ingredientName)
                ? prev.filter((name) => name !== ingredientName)
                : [...prev, ingredientName]
        );
    };

    return (
        <Stack
            align="center"
            mih="100vh"
            w="100%"
            style={{ backgroundColor: "#f8f9f8" }}
        >
            <Stack
                w="100%"
                maw={rem(1655)}
                p="xl"
                gap="xs"
            >
                <Tabs defaultValue="generated recipes" color="#8a9a7b">
                    <Tabs.List justify="space-between">
                        <Tabs.Tab value="generated recipes" leftSection={<Blocks size={16} />} style={{ fontSize: '16px' }}>
                            Generate Recipe
                        </Tabs.Tab>
                        <Tabs.Tab value="saved recipes" leftSection={<Save size={16} />} style={{ fontSize: '16px' }}>
                            Saved Recipe
                        </Tabs.Tab>
                        <Tabs.Tab value="favorite recipes" leftSection={<BookHeart size={16} />} style={{ fontSize: '16px' }}>
                            Favorite Recipe
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="generated recipes" pt="xl">
                        <Group align="flex-start" gap="lg" wrap="nowrap">
                            <Paper
                                shadow="md"
                                p="lg"
                                radius={"lg"}
                                w={350}
                                miw={350}
                                h="calc(100vh - 250px)"
                                style={{
                                    backgroundColor: 'white',
                                    border: '2px solid #8a9a7b',
                                }}
                            >
                                <Flex h="100%" direction="column">
                                    <Box ta="center">
                                        <Title order={4} mb="md" style={{ color: '#2d3319' }}>
                                            Ingredients Available
                                        </Title>
                                        <Divider mb="md" color="#e8f0e8" />
                                    </Box>

                                    <Group gap="xs" mih={300} justify="center">
                                        {ingredients.map((ingredient: Ingredient) => {
                                            const isSelected = selectedIngredients.includes(ingredient.name);
                                            return (
                                                <Badge
                                                    key={ingredient.id}
                                                    radius="lg"
                                                    size="xl"
                                                    onClick={() => toggleIngredient(ingredient.name)}
                                                    variant={isSelected ? "filled" : "outline"}
                                                    style={{
                                                        backgroundColor: isSelected ? "#8a9a7b" : "transparent",
                                                        color: isSelected ? "white" : "#2d3319",
                                                        borderColor: "#8a9a7b",
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease",
                                                    }}
                                                >
                                                    <Text size="sm">{ingredient.name}</Text>
                                                </Badge>
                                            );
                                        })}
                                    </Group>

                                    <Box mt="auto">
                                        <Button
                                            fullWidth
                                            size="md"
                                            styles={{
                                                root: {
                                                    backgroundColor: '#8a9a7b',
                                                    '&:hover': {
                                                        backgroundColor: '#6b7c5e',
                                                    },
                                                },
                                            }}
                                        >
                                            Generate Recipe
                                        </Button>
                                    </Box>
                                </Flex>
                            </Paper>

                            <Box style={{ flex: 1 }}>
                                <SimpleGrid cols={3} spacing="lg">
                                    <Card
                                        shadow="sm"
                                        padding="lg"
                                        radius="md"
                                        withBorder
                                        style={{
                                            borderColor: '#e8f0e8',
                                        }}
                                    >
                                        <Card.Section
                                            style={{
                                                height: '160px',
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Text c="dimmed" size="sm">Recipe Image</Text>
                                        </Card.Section>

                                        <Text fw={500} size="lg" mt="md" style={{ color: '#2d3319' }}>
                                            Recipe Title
                                        </Text>

                                        <Text size="sm" c="dimmed" mt="xs">
                                            Recipe details will appear here
                                        </Text>

                                        <Button
                                            fullWidth
                                            mt="md"
                                            styles={{
                                                root: {
                                                    backgroundColor: '#8a9a7b',
                                                    '&:hover': {
                                                        backgroundColor: '#6b7c5e',
                                                    },
                                                },
                                            }}
                                        >
                                            View Recipe
                                        </Button>
                                    </Card>

                                    <Card
                                        shadow="sm"
                                        padding="lg"
                                        radius="md"
                                        withBorder
                                        style={{
                                            borderColor: '#e8f0e8',
                                        }}
                                    >
                                        <Card.Section
                                            style={{
                                                height: '160px',
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Text c="dimmed" size="sm">Recipe Image</Text>
                                        </Card.Section>

                                        <Text fw={500} size="lg" mt="md" style={{ color: '#2d3319' }}>
                                            Recipe Title
                                        </Text>

                                        <Text size="sm" c="dimmed" mt="xs">
                                            Recipe details will appear here
                                        </Text>

                                        <Button
                                            fullWidth
                                            mt="md"
                                            styles={{
                                                root: {
                                                    backgroundColor: '#8a9a7b',
                                                    '&:hover': {
                                                        backgroundColor: '#6b7c5e',
                                                    },
                                                },
                                            }}
                                        >
                                            View Recipe
                                        </Button>
                                    </Card>

                                    <Card
                                        shadow="sm"
                                        padding="lg"
                                        radius="md"
                                        withBorder
                                        style={{
                                            borderColor: '#e8f0e8',
                                        }}
                                    >
                                        <Card.Section
                                            style={{
                                                height: '160px',
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Text c="dimmed" size="sm">Recipe Image</Text>
                                        </Card.Section>

                                        <Text fw={500} size="lg" mt="md" style={{ color: '#2d3319' }}>
                                            Recipe Title
                                        </Text>

                                        <Text size="sm" c="dimmed" mt="xs">
                                            Recipe details will appear here
                                        </Text>

                                        <Button
                                            fullWidth
                                            mt="md"
                                            styles={{
                                                root: {
                                                    backgroundColor: '#8a9a7b',
                                                    '&:hover': {
                                                        backgroundColor: '#6b7c5e',
                                                    },
                                                },
                                            }}
                                        >
                                            View Recipe
                                        </Button>
                                    </Card>
                                </SimpleGrid>
                            </Box>
                        </Group>
                    </Tabs.Panel>

                    <Tabs.Panel value="saved recipes" pt="xl">
                        <Flex justify={"flex-end"} gap={"md"} mb={"xl"}>
                            <TextInput placeholder="Search saved recipes..." w={700} radius={"md"} />
                            <Select placeholder="Sort Recipes" data={[
                                'Beef',
                                'Chicken',
                                'Vegetarian',
                                'Vegan',
                                'Dessert',
                                'Lamb',
                                'Miscellaneous',
                                'Pasta',
                                'Seafood',
                                'Side',
                                'Pork',
                                'Breakfast',
                                'Goat',
                                'Starter'
                            ]}
                                style={{ width: 160 }}
                                radius={"md"}
                                checkIconPosition="right"
                                clearable
                                allowDeselect
                            />
                            <Button leftSection={<Plus size={18} />} w={"160px"} radius={"md"} styles={{
                                root: {
                                    backgroundColor: '#8a9a7b'
                                }
                            }}>
                                Add Recipe
                            </Button>
                        </Flex>
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
                            <Stack align="center" gap="md">
                                <Save size={48} color="#8a9a7b" />
                                <div>
                                    <Text fw={500} size="lg" style={{ color: '#2d3319' }}>
                                        Saved Recipes
                                    </Text>
                                    <Text size="sm" c="dimmed" mt="xs">
                                        Your saved recipes will appear here
                                    </Text>
                                </div>
                            </Stack>
                        </Paper>
                    </Tabs.Panel>

                    <Tabs.Panel value="favorite recipes" pt="xl">
                        <Flex justify={"flex-end"} gap={"md"}>
                            <TextInput placeholder="Search favorite recipes..." w={700} mb="xl" radius={"md"} />
                            <Select placeholder="Sort Recipes" data={[
                                'Beef',
                                'Chicken',
                                'Vegetarian',
                                'Vegan',
                                'Dessert',
                                'Lamb',
                                'Miscellaneous',
                                'Pasta',
                                'Seafood',
                                'Side',
                                'Pork',
                                'Breakfast',
                                'Goat',
                                'Starter'
                            ]}
                                style={{ width: 160 }}
                                radius={"md"}
                                checkIconPosition="right"
                                clearable
                                allowDeselect
                            />
                        </Flex>
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
                            <Stack align="center" gap="md">
                                <BookHeart size={48} color="#8a9a7b" />
                                <div>
                                    <Text fw={500} size="lg" style={{ color: '#2d3319' }}>
                                        Favorite Recipes
                                    </Text>
                                    <Text size="sm" c="dimmed" mt="xs">
                                        Your favorite recipes will appear here
                                    </Text>
                                </div>
                            </Stack>
                        </Paper>
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Stack>
    );
}

export default RecipePage;