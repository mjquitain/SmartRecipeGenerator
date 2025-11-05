import { rem, Stack, Table } from "@mantine/core";

function MyIngredientsPage() {
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
                <Table.ScrollContainer minWidth={500}>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Quantity</Table.Th>
                                <Table.Th>Ingredient</Table.Th>
                                <Table.Th>Category</Table.Th>
                                <Table.Th>Date Added</Table.Th>
                                <Table.Th>Actions</Table.Th>
                                <Table.Th> Days in Storage</Table.Th>
                                <Table.Th> Expiration Date</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                    </Table>
                </Table.ScrollContainer>
            </Stack>
        </Stack>
    );
}

export default MyIngredientsPage;