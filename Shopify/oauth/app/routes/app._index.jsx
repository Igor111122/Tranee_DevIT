import { useState, useCallback } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { Page, Layout, Text, Card, Button, BlockStack, Box, List, Link, InlineStack, ResourceList, ResourceItem, Avatar,   TextField, LegacyFilters, Pagination} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

function sortByField(a, b, field) {
  // Convert field values to numbers for ID
  const valueA = field === 'id' ? parseInt(a[field], 10) : a[field];
  const valueB = field === 'id' ? parseInt(b[field], 10) : b[field];

  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `query {
      products(first: 20, reverse: true) {
        edges {
          node {
            id
            title
            handle
            description
            status
          }
        }
      }
    }`,
  );
  const responseJson = await response.json();

  return json({
    product: responseJson.data.products.edges,
  });
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const [sortValue, setSortValue] = useState('Id');
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Set the number of items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  //need to resource filter
  const [sortDescription, setSortDescription] = useState('gift');
  const [queryValue, setQueryValue] = useState(undefined);
  const [sortStatus, setSortStatus] = useState('');

  const handlePageChange = useCallback((newPage) => setCurrentPage(newPage), []);
  const handleTaggedWithChange = useCallback((value) => setSortDescription(value), []);
  const handleTaggedWithRemove = useCallback(() => setSortDescription(undefined), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(undefined), []);
  const handleSortLocationChange = useCallback((value) => setSortStatus(value), []);
  const handleSortLocationRemove = useCallback(() => setSortStatus(undefined), []);
  const handleClearAll = useCallback(() => { handleTaggedWithRemove(); handleQueryValueRemove(); handleSortLocationRemove(); setCurrentPage(1); }, [handleQueryValueRemove, handleTaggedWithRemove, handleSortLocationRemove]);

  const filters = [
    {
      key: 'sortDescription',
      label: 'Sort by description',
      filter: (
        <TextField
          label="Sort by description"
          value={sortDescription}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: 'sortStatus',
      label: 'Sort by status',
      filter: (
        <TextField
          label="Sort by status"
          value={sortStatus}
          onChange={handleSortLocationChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [
    ...(sortDescription && !isEmpty(sortDescription)
      ? [
          {
            key: 'taggedWith1',
            label: `Sort by description: ${sortDescription}`,
            onRemove: handleTaggedWithRemove,
          },
        ]
      : []),
    ...(queryValue && !isEmpty(queryValue)
      ? [
          {
            key: 'name',
            label: `Name: ${queryValue}`,
            onRemove: handleQueryValueRemove,
          },
        ]
      : []),
    ...(sortStatus && !isEmpty(sortStatus)
      ? [
          {
            key: 'sortLocation',
            label: `Sort by status: ${sortStatus}`,
            onRemove: handleSortLocationRemove,
          },
        ]
      : []),
  ];

  function filterProducts(item){
      const nameMatch = item.node.title.toLowerCase().includes(queryValue?.toLowerCase() || '');
      const taggedWithMatch = item.node.description.toLowerCase().includes(sortDescription?.toLowerCase() || '');
      const locationMatch = item.node.status.toLowerCase().includes(sortStatus?.toLowerCase() || '');
      return nameMatch && taggedWithMatch && locationMatch;
  }


  const generateProduct = () => submit({}, { replace: true, method: "POST" });

  return (
    <Page>
      <ui-title-bar title="App created by Igor">
        <button variant="primary" onClick={generateProduct}>
          Show products
        </button>
      </ui-title-bar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                  Now you can show all products 🎉
                  </Text>
                  <Text variant="bodyMd" as="p">
                    You can sort it or filter with pagination
                  </Text>
                </BlockStack>
                <InlineStack gap="300">
                  <Button loading={isLoading} onClick={generateProduct}>
                  Show products
                  </Button>
                </InlineStack>

                {//simple resource list
                }
                {actionData?.product && (
                  <ResourceList
                    resourceName={{singular: 'customer', plural: 'products'}}
                    items={actionData.product}
                    renderItem={(item) => {
                      const {id, title, handle, status} = item.node;
                      const media = <Avatar customer size="md" />;

                      return (
                        <ResourceItem
                          id={id}
                          url={title}
                          media={media}
                          accessibilityLabel={`View details for ${title}`}
                        >
                          <Text variant="bodyMd" fontWeight="bold" as="h3">
                            {title}
                          </Text>
                          <div>{`Id = `+id}</div>
                          <div>{`Handle = `+handle}</div>
                          <div>{`Status = `+status}</div>
                        </ResourceItem>
                      );
                    }}
                  />
                )}


                {//resource with sort
                }
                {actionData?.product && (
                  <ResourceList
                    resourceName={{singular: 'customer', plural: 'products'}}
                    items={sortedProducts.length > 0 ? sortedProducts : actionData.product}

                    renderItem={(item) => {
                      const {id, title, handle, status} = item.node;
                      const media = <Avatar customer size="md" />;

                      return (
                        <ResourceItem
                          id={id}
                          url={title}
                          media={media}
                          accessibilityLabel={`View details for ${title}`}
                        >
                          <Text variant="bodyMd" fontWeight="bold" as="h3">
                            {title}
                          </Text>
                          <div>{`Id = `+id}</div>
                          <div>{`Handle = `+handle}</div>
                          <div>{`Status = `+status}</div>
                        </ResourceItem>
                      );
                    }}
                    sortValue={sortValue}
                    sortOptions={[
                      { label: 'id', value: 'id' },
                      { label: 'title', value: 'title' },
                    ]}
                    onSortChange={(selected) => {
                      // Clone the original array to avoid modifying the original state directly
                      const sortedCopy = [...actionData.product];

                      // Sort the array based on the selected field
                      sortedCopy.sort((a, b) => sortByField(a.node, b.node, selected));

                      // Update the state with the sorted array and the selected sort value
                      setSortedProducts(sortedCopy);
                      setSortValue(selected);
                    }}
                  />
                )}


                {//resource list with filter and pagination
                }
                {actionData?.product && (
                  <>
                  <ResourceList
                    resourceName={{singular: 'customer', plural: 'products'}}
                    items={actionData.product.filter((item) => { return filterProducts(item) }).slice(startIndex, endIndex)}// enables filter to the products and slice it to the pages

                    renderItem={(item) => {
                      const {id, title, handle, status} = item.node;
                      const media = <Avatar customer size="md" />;

                      return (
                        <ResourceItem
                          id={id}
                          url={title}
                          media={media}
                          accessibilityLabel={`View details for ${title}`}
                        >
                          <Text variant="bodyMd" fontWeight="bold" as="h3">
                            {title}
                          </Text>
                          <div>{`Id = `+id}</div>
                          <div>{`Handle = `+handle}</div>
                          <div>{`Status = `+status}</div>
                        </ResourceItem>
                      );
                    }}
                    filterControl={(
                      <LegacyFilters
                        queryValue={queryValue}
                        filters={filters}
                        appliedFilters={appliedFilters}
                        onQueryChange={setQueryValue}
                        onQueryClear={handleQueryValueRemove}
                        onClearAll={handleClearAll}
                      >
                        <div style={{ paddingLeft: '8px' }}>
                          <Button onClick={() => console.log('New filter saved')}>Save</Button>
                        </div>
                      </LegacyFilters>
                    )}
                  />
                  <Pagination
                    hasPrevious={currentPage > 1}
                    hasNext={currentPage < Math.ceil((actionData.product.filter((item)=>{return filterProducts(item)}).length) / itemsPerPage)} //Math.ceil... calculates totalPages
                    onPrevious={() => handlePageChange(currentPage - 1)}
                    onNext={() => handlePageChange(currentPage + 1)}
                  />
                  </>
                )}



                {actionData?.product && (
                  <Box
                    padding="400"
                    background="bg-surface-active"
                    borderWidth="025"
                    borderRadius="200"
                    borderColor="border"
                    overflowX="scroll"
                  >
                    <pre style={{ margin: 0 }}>
                      <code>{JSON.stringify(actionData.product, null, 2)}</code>
                    </pre>
                  </Box>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    App template specs
                  </Text>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Framework
                      </Text>
                      <Link
                        url="https://remix.run"
                        target="_blank"
                        removeUnderline
                      >
                        Remix
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Database
                      </Text>
                      <Link
                        url="https://www.prisma.io/"
                        target="_blank"
                        removeUnderline
                      >
                        Prisma
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Interface
                      </Text>
                      <span>
                        <Link
                          url="https://polaris.shopify.com"
                          target="_blank"
                          removeUnderline
                        >
                          Polaris
                        </Link>
                        {", "}
                        <Link
                          url="https://shopify.dev/docs/apps/tools/app-bridge"
                          target="_blank"
                          removeUnderline
                        >
                          App Bridge
                        </Link>
                      </span>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        API
                      </Text>
                      <Link
                        url="https://shopify.dev/docs/api/admin-graphql"
                        target="_blank"
                        removeUnderline
                      >
                        GraphQL API
                      </Link>
                    </InlineStack>
                  </BlockStack>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Next steps
                  </Text>
                  <List>
                    <List.Item>
                      Build an{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/getting-started/build-app-example"
                        target="_blank"
                        removeUnderline
                      >
                        {" "}
                        example app
                      </Link>{" "}
                      to get started
                    </List.Item>
                    <List.Item>
                      Explore Shopify’s API with{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
                        target="_blank"
                        removeUnderline
                      >
                        GraphiQL
                      </Link>
                    </List.Item>
                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
