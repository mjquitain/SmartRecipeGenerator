import {
    Box,
    Button,
    Card,
    Divider,
    Flex,
    Group,
    Paper,
    rem,
    SimpleGrid,
    Stack,
    Tabs,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import { Blocks, BookHeart, Save } from "lucide-react";

function RecipePage() {
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
                                p="lg"
                                w={350}
                                miw={350}
                                mih="calc(100vh - 250px)"
                                style={{
                                    backgroundColor: 'white',
                                    border: '2px solid #8a9a7b',
                                    borderRadius: '10px',
                                }}
                            >
                                <Stack h="100%" justify="space-between">
                                    <Box align="center">
                                        <Title order={4} mb="md" style={{ color: '#2d3319' }}>
                                            Ingredients Available
                                        </Title>
                                        <Divider mb="md" color="#e8f0e8" />

                                        <Stack gap="xs" mih={300}>
                                        </Stack>
                                    </Box>

                                    <Button
                                        fullWidth
                                        top={"230px"}
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
                                </Stack>
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
                        <Flex justify={"flex-end"}>
                            <TextInput placeholder="Search saved recipes..." w={800} mb="xl" />
                            <Button ml="md" mb="xl" styles={{
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