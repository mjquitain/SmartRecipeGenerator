import {
    ActionIcon,
    Badge,
    Button,
    Flex,
    Group,
    Paper,
    rem,
    Select,
    Stack,
    Table,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { ingredients } from "../../data/mock_ingredients_data";

interface Ingredient {
    id: number;
    name: string;
    category: string;
    quantity: string;
    dateAdded: string;
    expiryDate: string;
}

export const calculateDaysInStorage = (dateAdded: string): number => {
    const added = new Date(dateAdded);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - added.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const getExpiryStatus = (
    expiryDate: string
): { color: string; label: string; days: number } => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) return { color: "red", label: "Expired", days: Math.abs(days) };
    if (days === 0) return { color: "red", label: "Expires Today", days: 0 };
    if (days <= 3) return { color: "orange", label: `${days}d left`, days };
    if (days <= 7) return { color: "yellow", label: `${days}d left`, days };
    return { color: "green", label: `${days}d left`, days };
};

function MyIngredientsPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredIngredients = useMemo(() => {
        return ingredients.filter((item) => {
            const matchesSearch = item.name
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesCategory = selectedCategory
                ? item.category === selectedCategory
                : true;
            return matchesSearch && matchesCategory;
        });
    }, [search, selectedCategory]);

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
                <Flex direction={"row"} justify={"space-between"} align={"center"} mb="lg">
                    <Flex justify={"flex-start"} direction={"column"}>
                        <Title order={2} style={{ color: '#2d3319' }}>
                            My Ingredients
                        </Title>
                        <Text size="sm" c="dimmed" style={{ color: '#5a6b4f' }}>
                            Manage your pantry and track expiration dates
                        </Text>
                    </Flex>
                    <Flex justify={"flex-end"} gap={"md"} style={{ flex: 1 }}>
                        <TextInput
                            placeholder="Search ingredients..."
                            radius={"md"}
                            style={{ flex: 1, minWidth: '200px', maxWidth: "800px" }}
                            value={search}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                        />
                        <Select placeholder="Category" data={[
                            'Protein',
                            'Dairy',
                            'Condiment',
                            'Grain',
                            'Fruit',
                            'Vegetable',
                        ]}
                            style={{ width: "100%", maxWidth: 160, minWidth: 100 }}
                            radius={"md"}
                            checkIconPosition="right"
                            clearable
                            allowDeselect
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                        />
                        <Button
                            leftSection={<Plus size={18} />}
                            w={"100%"}
                            miw={"100px"}
                            maw={"160px"}
                            color="#6b7c5e"
                        >
                            Add Ingredient
                        </Button>
                    </Flex>
                </Flex>

                <Paper
                    shadow="sm"
                    p="md"
                    radius="md"
                    style={{
                        backgroundColor: 'white',
                        border: '2px solid #8a9a7b',
                    }}
                >
                    <Table.ScrollContainer minWidth={800}>
                        <Table
                            withColumnBorders
                            styles={{
                                th: {
                                    backgroundColor: '#f8f9f8',
                                    color: '#2d3319',
                                    fontWeight: 600,
                                    padding: '12px 16px',
                                },
                                td: {
                                    padding: '12px 16px',
                                },
                            }}
                        >
                            {/* Use Mantine React Table in the future */}
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Quantity</Table.Th>
                                    <Table.Th>Ingredient</Table.Th>
                                    <Table.Th>Category</Table.Th>
                                    <Table.Th>Date Added</Table.Th>
                                    <Table.Th>Days In Storage</Table.Th>
                                    <Table.Th>Expiration Date</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                    <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>

                            <Table.Tbody>
                                {filteredIngredients.map((item: Ingredient, index: number) => {
                                    const expiryStatus = getExpiryStatus(item.expiryDate);

                                    return (
                                        <Table.Tr key={index}>
                                            <Table.Td>
                                                <Text size="sm" fw={500} style={{ color: '#2d3319' }}>
                                                    {item.quantity}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" fw={500} style={{ color: '#2d3319' }}>
                                                    {item.name}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge
                                                    variant="light"
                                                    color="gray"
                                                    size="sm"
                                                >
                                                    {item.category}
                                                </Badge>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="dimmed">
                                                    {new Date(item.dateAdded).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="dimmed">
                                                    {calculateDaysInStorage(item.dateAdded)} days
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text size="sm" c="dimmed">
                                                    {new Date(item.expiryDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Badge
                                                    variant="filled"
                                                    color={expiryStatus.color}
                                                    size="sm"
                                                >
                                                    {expiryStatus.label}
                                                </Badge>
                                            </Table.Td>
                                            <Table.Td>
                                                <Group gap="xs" justify="flex-end">
                                                    <Button
                                                        color="#6b7c5e"
                                                        size="xs">
                                                        Mark as Used
                                                    </Button>
                                                    <ActionIcon
                                                        variant="light"
                                                        color="blue"
                                                        size="sm"
                                                    >
                                                        <Edit size={16} />
                                                    </ActionIcon>
                                                    <ActionIcon
                                                        variant="light"
                                                        color="red"
                                                        size="sm"
                                                    >
                                                        <Trash2 size={16} />
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </Table.Tr>
                                    );
                                })}
                                {filteredIngredients.length === 0 && (
                                    <Table.Tr>
                                        <Table.Td colSpan={8}>
                                            <Paper
                                                style={{
                                                    backgroundColor: 'white',
                                                    border: '2px dashed #e8f0e8',
                                                    borderRadius: '10px',
                                                    textAlign: 'center',
                                                    minHeight: '200px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                <Text c="dimmed" ta="center">
                                                    No ingredients found matching your search and category selection.
                                                </Text>
                                            </Paper>
                                        </Table.Td>
                                    </Table.Tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </Paper>
            </Stack>
        </Stack >
    );
}

export default MyIngredientsPage;