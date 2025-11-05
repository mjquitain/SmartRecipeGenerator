import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Card,
    Group,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    TextInput,
    Title,
    rem
} from '@mantine/core';
import { ChefHat, Clock, Heart, Leaf, Plus, Search, X } from 'lucide-react';
import { useState } from 'react';

function DashboardPage() {
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState('');

    const addIngredient = () => {
        if (currentIngredient.trim() !== '') {
            setIngredients([...ingredients, currentIngredient.trim()]);
            setCurrentIngredient('');
        }
    };

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addIngredient();
        }
    };

    const quickStats = [
        { icon: Heart, label: 'Saved Recipes', value: '0', color: '#8a9a7b' },
        { icon: ChefHat, label: 'Recipes Found', value: '0', color: '#6b7c5e' },
        { icon: Leaf, label: 'Food Saved', value: '0kg', color: '#9aaa8b' },
    ];

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
                <SimpleGrid cols={3} spacing="lg" mb={40}>
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

                {/* Main Input Section */}
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

                        {/* Ingredient Input */}
                        <Group>
                            <TextInput
                                placeholder="e.g., chicken, tomatoes, pasta..."
                                value={currentIngredient}
                                onChange={(e) => setCurrentIngredient(e.currentTarget.value)}
                                onKeyPress={handleKeyPress}
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
                                Add
                            </Button>
                        </Group>

                        {/* Ingredient Tags */}
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

                        {/* Generate Button */}
                        {ingredients.length > 0 && (
                            <Button
                                size="lg"
                                fullWidth
                                leftSection={<Search size={20} />}
                                styles={{
                                    root: {
                                        backgroundColor: '#6b7c5e',
                                        '&:hover': {
                                            backgroundColor: '#5a6b4f',
                                        },
                                    },
                                }}
                            >
                                Generate Recipe Ideas
                            </Button>
                        )}
                    </Stack>
                </Paper>

                {/* Quick Actions */}
                <SimpleGrid cols={2} spacing="lg">
                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{
                            borderColor: '#e8f0e8',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onClick={() => console.log('Browse by meal type')}
                    >
                        <Group>
                            <Clock size={24} color="#8a9a7b" />
                            <div>
                                <Text fw={500} style={{ color: '#2d3319' }}>
                                    Browse by Meal Type
                                </Text>
                                <Text size="sm" c="dimmed" style={{ color: '#5a6b4f' }}>
                                    Breakfast, Lunch, Dinner, Snacks
                                </Text>
                            </div>
                        </Group>
                    </Card>

                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{
                            borderColor: '#e8f0e8',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onClick={() => console.log('Manage ingredients')}
                    >
                        <Group>
                            <Leaf size={24} color="#8a9a7b" />
                            <div>
                                <Text fw={500} style={{ color: '#2d3319' }}>
                                    Manage Ingredients
                                </Text>
                                <Text size="sm" c="dimmed" style={{ color: '#5a6b4f' }}>
                                    Track what you have at home
                                </Text>
                            </div>
                        </Group>
                    </Card>
                </SimpleGrid>
            </Stack>
        </Stack>
    );
}

export default DashboardPage;