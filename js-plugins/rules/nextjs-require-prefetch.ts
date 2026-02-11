// oxlint-disable no-unsafe-argument
// oxlint-disable no-unsafe-call
// oxlint-disable no-unsafe-return
import { defineRule } from "@oxlint/plugins";

const requirePrefetch = defineRule({
  meta: {
    messages: {
      missingPrefetch:
        "Next.js Link component must have explicit prefetch prop (prefetch, prefetch={false}, or prefetch={true})",
    },
    fixable: "code",
  },
  create(context) {
    const nextLinkIdentifiers = new Set<string>();

    return {
      ImportDeclaration(node: any) {
        if (node.source.value !== "next/link") {
          return;
        }

        for (const specifier of node.specifiers) {
          if (specifier.type === "ImportDefaultSpecifier") {
            nextLinkIdentifiers.add(specifier.local.name);
          } else if (specifier.type === "ImportSpecifier") {
            if (specifier.imported.name === "Link") {
              nextLinkIdentifiers.add(specifier.local.name);
            }
          }
        }
      },

      JSXOpeningElement(node: any) {
        if (node.name.type !== "JSXIdentifier") {
          return;
        }

        if (!nextLinkIdentifiers.has(node.name.name)) {
          return;
        }

        const hasPrefetchProp = node.attributes.some((attr: any) => {
          if (attr.type !== "JSXAttribute") return false;
          if (attr.name.type !== "JSXIdentifier") return false;
          return attr.name.name === "prefetch";
        });

        if (!hasPrefetchProp) {
          context.report({
            messageId: "missingPrefetch",
            node,
            fix(fixer: any) {
              const lastAttribute = node.attributes[node.attributes.length - 1];
              if (lastAttribute) {
                return fixer.insertTextAfter(lastAttribute, " prefetch={false}");
              }
              return fixer.insertTextAfter(node.name, " prefetch={false}");
            },
          });
        }
      },
    };
  },
});

export default requirePrefetch;
