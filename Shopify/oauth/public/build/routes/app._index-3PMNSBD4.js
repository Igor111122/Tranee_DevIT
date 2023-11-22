import {
  require_shopify
} from "/build/_shared/chunk-SU66BP3D.js";
import {
  Avatar,
  BlockStack,
  Box,
  Button,
  Card,
  InlineStack,
  Layout,
  LegacyFilters,
  Link,
  List,
  Page,
  Pagination,
  ResourceItem,
  ResourceList,
  Text,
  TextField,
  init_esm as init_esm2
} from "/build/_shared/chunk-DTVQRXNR.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  init_esm,
  useActionData,
  useNavigation,
  useSubmit
} from "/build/_shared/chunk-4A2TBT2S.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext,
  init_remix_hmr
} from "/build/_shared/chunk-ZV4HHTYV.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/app._index.jsx
init_remix_hmr();
var import_react = __toESM(require_react());
var import_node = __toESM(require_node());
init_esm();
init_esm2();
var import_shopify = __toESM(require_shopify());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/app._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/app._index.jsx"
  );
  import.meta.hot.lastModified = "1700581258702.685";
}
function sortByField(a, b, field) {
  const valueA = field === "id" ? parseInt(a[field], 10) : a[field];
  const valueB = field === "id" ? parseInt(b[field], 10) : b[field];
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
    return value === "" || value == null;
  }
}
function Index() {
  _s();
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const [sortValue, setSortValue] = (0, import_react.useState)("Id");
  const [sortedProducts, setSortedProducts] = (0, import_react.useState)([]);
  const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [sortDescription, setSortDescription] = (0, import_react.useState)("gift");
  const [queryValue, setQueryValue] = (0, import_react.useState)(void 0);
  const [sortStatus, setSortStatus] = (0, import_react.useState)("");
  const handlePageChange = (0, import_react.useCallback)((newPage) => setCurrentPage(newPage), []);
  const handleTaggedWithChange = (0, import_react.useCallback)((value) => setSortDescription(value), []);
  const handleTaggedWithRemove = (0, import_react.useCallback)(() => setSortDescription(void 0), []);
  const handleQueryValueRemove = (0, import_react.useCallback)(() => setQueryValue(void 0), []);
  const handleSortLocationChange = (0, import_react.useCallback)((value) => setSortStatus(value), []);
  const handleSortLocationRemove = (0, import_react.useCallback)(() => setSortStatus(void 0), []);
  const handleClearAll = (0, import_react.useCallback)(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
    handleSortLocationRemove();
    setCurrentPage(1);
  }, [handleQueryValueRemove, handleTaggedWithRemove, handleSortLocationRemove]);
  const filters = [{
    key: "sortDescription",
    label: "Sort by description",
    filter: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Sort by description", value: sortDescription, onChange: handleTaggedWithChange, autoComplete: "off", labelHidden: true }, void 0, false, {
      fileName: "app/routes/app._index.jsx",
      lineNumber: 108,
      columnNumber: 13
    }, this),
    shortcut: true
  }, {
    key: "sortStatus",
    label: "Sort by status",
    filter: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField, { label: "Sort by status", value: sortStatus, onChange: handleSortLocationChange, autoComplete: "off", labelHidden: true }, void 0, false, {
      fileName: "app/routes/app._index.jsx",
      lineNumber: 113,
      columnNumber: 13
    }, this),
    shortcut: true
  }];
  const appliedFilters = [...sortDescription && !isEmpty(sortDescription) ? [{
    key: "taggedWith1",
    label: `Sort by description: ${sortDescription}`,
    onRemove: handleTaggedWithRemove
  }] : [], ...queryValue && !isEmpty(queryValue) ? [{
    key: "name",
    label: `Name: ${queryValue}`,
    onRemove: handleQueryValueRemove
  }] : [], ...sortStatus && !isEmpty(sortStatus) ? [{
    key: "sortLocation",
    label: `Sort by status: ${sortStatus}`,
    onRemove: handleSortLocationRemove
  }] : []];
  function filterProducts(item) {
    const nameMatch = item.node.title.toLowerCase().includes((queryValue == null ? void 0 : queryValue.toLowerCase()) || "");
    const taggedWithMatch = item.node.description.toLowerCase().includes((sortDescription == null ? void 0 : sortDescription.toLowerCase()) || "");
    const locationMatch = item.node.status.toLowerCase().includes((sortStatus == null ? void 0 : sortStatus.toLowerCase()) || "");
    return nameMatch && taggedWithMatch && locationMatch;
  }
  const generateProduct = () => submit({}, {
    replace: true,
    method: "POST"
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Page, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ui-title-bar", { title: "App created by Igor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { variant: "primary", onClick: generateProduct, children: "Show products" }, void 0, false, {
      fileName: "app/routes/app._index.jsx",
      lineNumber: 141,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/app._index.jsx",
      lineNumber: 140,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "500", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Now you can show all products \u{1F389}" }, void 0, false, {
            fileName: "app/routes/app._index.jsx",
            lineNumber: 151,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", as: "p", children: "You can sort it or filter with pagination" }, void 0, false, {
            fileName: "app/routes/app._index.jsx",
            lineNumber: 154,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 150,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { gap: "300", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { loading: isLoading, onClick: generateProduct, children: "Show products" }, void 0, false, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 159,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 158,
          columnNumber: 17
        }, this),
        (actionData == null ? void 0 : actionData.product) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResourceList, { resourceName: {
          singular: "customer",
          plural: "products"
        }, items: actionData.product, renderItem: (item) => {
          const {
            id,
            title,
            handle,
            status
          } = item.node;
          const media = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { customer: true, size: "md" }, void 0, false, {
            fileName: "app/routes/app._index.jsx",
            lineNumber: 176,
            columnNumber: 31
          }, this);
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResourceItem, { id, url: title, media, accessibilityLabel: `View details for ${title}`, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", fontWeight: "bold", as: "h3", children: title }, void 0, false, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 178,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: `Id = ` + id }, void 0, false, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 181,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: `Handle = ` + handle }, void 0, false, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 182,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: `Status = ` + status }, void 0, false, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 183,
              columnNumber: 27
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app._index.jsx",
            lineNumber: 177,
            columnNumber: 24
          }, this);
        } }, void 0, false, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 166,
          columnNumber: 41
        }, this),
        (actionData == null ? void 0 : actionData.product) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResourceList, { resourceName: {
          singular: "customer",
          plural: "products"
        }, items: sortedProducts.length > 0 ? sortedProducts : actionData.product, renderItem: (item) => {
          const {
            id,
            title,
            handle,
            status
          } = item.node;
          const media = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { customer: true, size: "md" }, void 0, false, {
            fileName: "app/routes/app._index.jsx",
            lineNumber: 200,
            columnNumber: 31
          }, this);
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResourceItem, { id, url: title, media, accessibilityLabel: `View details for ${title}`, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", fontWeight: "bold", as: "h3", children: title }, void 0, false, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 202,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: `Id = ` + id }, void 0, false, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 205,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: `Handle = ` + handle }, void 0, false, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 206,
              columnNumber: 27
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: `Status = ` + status }, void 0, false, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 207,
              columnNumber: 27
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app._index.jsx",
            lineNumber: 201,
            columnNumber: 24
          }, this);
        }, sortValue, sortOptions: [{
          label: "id",
          value: "id"
        }, {
          label: "title",
          value: "title"
        }], onSortChange: (selected) => {
          const sortedCopy = [...actionData.product];
          sortedCopy.sort((a, b) => sortByField(a.node, b.node, selected));
          setSortedProducts(sortedCopy);
          setSortValue(selected);
        } }, void 0, false, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 190,
          columnNumber: 41
        }, this),
        (actionData == null ? void 0 : actionData.product) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            ResourceList,
            {
              resourceName: {
                singular: "customer",
                plural: "products"
              },
              items: actionData.product.filter((item) => {
                return filterProducts(item);
              }).slice(startIndex, endIndex),
              renderItem: (item) => {
                const {
                  id,
                  title,
                  handle,
                  status
                } = item.node;
                const media = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Avatar, { customer: true, size: "md" }, void 0, false, {
                  fileName: "app/routes/app._index.jsx",
                  lineNumber: 244,
                  columnNumber: 33
                }, this);
                return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResourceItem, { id, url: title, media, accessibilityLabel: `View details for ${title}`, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { variant: "bodyMd", fontWeight: "bold", as: "h3", children: title }, void 0, false, {
                    fileName: "app/routes/app._index.jsx",
                    lineNumber: 246,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: `Id = ` + id }, void 0, false, {
                    fileName: "app/routes/app._index.jsx",
                    lineNumber: 249,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: `Handle = ` + handle }, void 0, false, {
                    fileName: "app/routes/app._index.jsx",
                    lineNumber: 250,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: `Status = ` + status }, void 0, false, {
                    fileName: "app/routes/app._index.jsx",
                    lineNumber: 251,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/app._index.jsx",
                  lineNumber: 245,
                  columnNumber: 26
                }, this);
              },
              filterControl: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LegacyFilters, { queryValue, filters, appliedFilters, onQueryChange: setQueryValue, onQueryClear: handleQueryValueRemove, onClearAll: handleClearAll, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
                paddingLeft: "8px"
              }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { onClick: () => console.log("New filter saved"), children: "Save" }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 257,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 254,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 253,
                columnNumber: 35
              }, this)
            },
            void 0,
            false,
            {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 231,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            Pagination,
            {
              hasPrevious: currentPage > 1,
              hasNext: currentPage < Math.ceil(actionData.product.filter((item) => {
                return filterProducts(item);
              }).length / itemsPerPage),
              onPrevious: () => handlePageChange(currentPage - 1),
              onNext: () => handlePageChange(currentPage + 1)
            },
            void 0,
            false,
            {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 260,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 230,
          columnNumber: 41
        }, this),
        (actionData == null ? void 0 : actionData.product) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box, { padding: "400", background: "bg-surface-active", borderWidth: "025", borderRadius: "200", borderColor: "border", overflowX: "scroll", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", { style: {
          margin: 0
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { children: JSON.stringify(actionData.product, null, 2) }, void 0, false, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 272,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 269,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 268,
          columnNumber: 41
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app._index.jsx",
        lineNumber: 149,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/app._index.jsx",
        lineNumber: 148,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app._index.jsx",
        lineNumber: 147,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "500", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "App template specs" }, void 0, false, {
            fileName: "app/routes/app._index.jsx",
            lineNumber: 282,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "span", variant: "bodyMd", children: "Framework" }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 287,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { url: "https://remix.run", target: "_blank", removeUnderline: true, children: "Remix" }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 290,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 286,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "span", variant: "bodyMd", children: "Database" }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 295,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { url: "https://www.prisma.io/", target: "_blank", removeUnderline: true, children: "Prisma" }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 298,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 294,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "span", variant: "bodyMd", children: "Interface" }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 303,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { url: "https://polaris.shopify.com", target: "_blank", removeUnderline: true, children: "Polaris" }, void 0, false, {
                  fileName: "app/routes/app._index.jsx",
                  lineNumber: 307,
                  columnNumber: 25
                }, this),
                ", ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { url: "https://shopify.dev/docs/apps/tools/app-bridge", target: "_blank", removeUnderline: true, children: "App Bridge" }, void 0, false, {
                  fileName: "app/routes/app._index.jsx",
                  lineNumber: 311,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 306,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 302,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "span", variant: "bodyMd", children: "API" }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 317,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { url: "https://shopify.dev/docs/api/admin-graphql", target: "_blank", removeUnderline: true, children: "GraphQL API" }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 320,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 316,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app._index.jsx",
            lineNumber: 285,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 281,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 280,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { as: "h2", variant: "headingMd", children: "Next steps" }, void 0, false, {
            fileName: "app/routes/app._index.jsx",
            lineNumber: 329,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List.Item, { children: [
              "Build an",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { url: "https://shopify.dev/docs/apps/getting-started/build-app-example", target: "_blank", removeUnderline: true, children: [
                " ",
                "example app"
              ] }, void 0, true, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 335,
                columnNumber: 23
              }, this),
              " ",
              "to get started"
            ] }, void 0, true, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 333,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List.Item, { children: [
              "Explore Shopify\u2019s API with",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { url: "https://shopify.dev/docs/apps/tools/graphiql-admin-api", target: "_blank", removeUnderline: true, children: "GraphiQL" }, void 0, false, {
                fileName: "app/routes/app._index.jsx",
                lineNumber: 343,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/app._index.jsx",
              lineNumber: 341,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/app._index.jsx",
            lineNumber: 332,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 328,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/app._index.jsx",
          lineNumber: 327,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/app._index.jsx",
        lineNumber: 279,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/app._index.jsx",
        lineNumber: 278,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/app._index.jsx",
      lineNumber: 146,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/app._index.jsx",
      lineNumber: 145,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/app._index.jsx",
    lineNumber: 139,
    columnNumber: 10
  }, this);
}
_s(Index, "f1kmokIxYMsocpYpyCcNjm4soUk=", false, function() {
  return [useNavigation, useActionData, useSubmit];
});
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/app._index-3PMNSBD4.js.map
