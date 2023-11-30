import { useCallback, useState } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {Page, Layout, Text, Card, Button, BlockStack, Box, InlineStack, Modal, TextContainer} from "@shopify/polaris";
import { authenticate } from "../shopify.server";


export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const responseImages = await admin.graphql(
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
  const responseImagesJson = await responseImages.json();
  const body = await request.formData();//get data from request

  if(body.get("selectedImage")){

    const responseId = await admin.graphql(
      `query {
        currentAppInstallation {
          id
        }
      }`,
    );
    const responseIdJson = await responseId.json();

    const responseSetMeta = await admin.graphql(
      `mutation CreateAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafieldsSetInput) {
        metafields {
          id
          namespace
          key 
        }
        userErrors {
          field
          message
        }
      }
    }`
        ,
        {
          variables: {
            metafieldsSetInput: [
              {
                namespace: "products_images",
                key: "images",
                type: "single_line_text_field",
                value: body.get("selectedImage"),
                ownerId: responseIdJson.data.currentAppInstallation.id,//set app instalation id
              },
            ],
          },
        });
    const responseSetMetaJson = await responseSetMeta.json();


    return json({
      images: responseImagesJson.data.files.edges,
      meta: responseSetMetaJson.data,
    });
  }else{
    return json({
      images: responseImagesJson.data.files.edges,
    });
  }
    
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";

  const generateProduct = () => submit({}, { replace: true, method: "POST" });
  
  const handleButtonClick = (imageId) => {//need to on click elect Image and set metafield
    console.log(`Selected image ID: ${imageId}`);
    submit({selectedImage: imageId}, { replace: true, method: "POST" });
  };

  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <Page>
      <ui-title-bar title="App change modal image">
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
                  <Text as="h2" variant="headingMd"> Select image for modal background 🎉 </Text>
                </BlockStack>
                <InlineStack gap="300">
                  <Button loading={isLoading} onClick={generateProduct}> Show images </Button>
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
                            <Button onClick={() => handleButtonClick(image.node.image.originalSrc)}> Select Image </Button>
                        </Card>
                      ))}
                      </div>
                  </Page>
                )}
                {actionData?.meta?.metafieldsSet?.userErrors[0]?.message && (
                  <Modal
                    open={active}
                    onClose={handleChange}
                    title="Error"
                  >
                    <Modal.Section>
                      <TextContainer>
                        <p>
                          {actionData.meta.metafieldsSet.userErrors[0].message}
                        </p>
                      </TextContainer>
                    </Modal.Section>
                  </Modal>
                )}
                {actionData?.meta?.metafieldsSet?.metafields[0]?.id && (
                  <Modal
                    open={active}
                    onClose={handleChange}
                    title="Image changed"
                  >
                    <Modal.Section>
                      <TextContainer>
                        <p>
                          You are sucsesfuly changed image
                        </p>
                      </TextContainer>
                    </Modal.Section>
                  </Modal>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
