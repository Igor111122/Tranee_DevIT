import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
  
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `query {
      files(first: 250) {
        edges {
          node {
            ... on MediaImage {
              id
              alt
              image {
                originalSrc: url
              }
            }
          }
        }
      }
    }`,
  );
  const responseJson = await response.json();

  const response2 = await admin.graphql(
    `query {
      currentAppInstallation {
        id
      }
    }`,
  );
  const responseJson2 = await response2.json();

  const response3 = await admin.graphql({
    data: {
      "query": `mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            key
            namespace
            value
            createdAt
            updatedAt
          }
          userErrors {
            field
            message
            code
          }
        }
      }`,
      "variables": {
        "metafields": [
          {
            "key": "materials",
            "namespace": "my_fields",
            "ownerId": "gid://shopify/AppInstallation/663404740930",
            "type": "multi_line_text_field",
            "value": "95% Cotton\n5% Spandex"
          },
          {
            "key": "manufactured",
            "namespace": "my_fields",
            "ownerId": "gid://shopify/AppInstallation/663404740930",
            "type": "single_line_text_field",
            "value": "Made in Canada"
          }
        ]
      },
    },
  }
  );
  const responseJson3 = await response3.json();



  return json({
    images: responseJson.data.files.edges,
    id: responseJson2.data.currentAppInstallation.id,
    meta: responseJson3.data,
  });
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";

  const generateProduct = () => submit({}, { replace: true, method: "POST" });
  
  const handleButtonClick = (imageId) => {
    console.log(`Selected image ID: ${imageId}`);
  };

  return (
    <Page>
      <ui-title-bar title="Remix app template">
        <button variant="primary" onClick={generateProduct}>
          Show images
        </button>
      </ui-title-bar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Select image for modal background 🎉
                  </Text>
                </BlockStack>
                <InlineStack gap="300">
                  <Button loading={isLoading} onClick={generateProduct}>
                    Show images
                  </Button>
                </InlineStack>
                {actionData?.images && (
                  <Page title="Image Gallery">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                      {actionData.images.map((image) => (
                        <Card key={image.node.id} style={{ width: '300px', margin: '16px' }}>
                          <img
                            src={image.node.image.originalSrc}
                            alt={image.node.alt}
                            style={{ maxWidth: '100%', height: 'auto' }}
                          />
                            <Text variation="subdued">{image.node.alt}</Text>
                            <Button onClick={() => console.log(image.node.image.originalSrc)}> Select Image </Button>
                        </Card>
                      ))}
                      </div>
                  </Page>
                )}
                {actionData?.id && (
                  <Box
                    padding="400"
                    background="bg-surface-active"
                    borderWidth="025"
                    borderRadius="200"
                    borderColor="border"
                    overflowX="scroll"
                  >
                    <pre style={{ margin: 0 }}>
                      <code>{JSON.stringify(actionData.id, null, 2)}</code>
                    </pre>
                  </Box>
                )}
                {actionData?.meta && (
                  <Box
                    padding="400"
                    background="bg-surface-active"
                    borderWidth="025"
                    borderRadius="200"
                    borderColor="border"
                    overflowX="scroll"
                  >
                    <pre style={{ margin: 0 }}>
                      <code>{JSON.stringify(actionData.meta, null, 2)}</code>
                    </pre>
                  </Box>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
