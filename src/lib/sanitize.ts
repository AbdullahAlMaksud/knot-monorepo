import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
    "p", "br", "b", "strong", "i", "em", "u", "s", "strike",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li",
    "blockquote", "pre", "code",
    "a", "img",
    "table", "thead", "tbody", "tr", "th", "td",
    "span", "div", "hr",
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
    "*": ["class"],
};

const ALLOWED_SCHEMES = ["https", "http", "mailto"];

export function sanitizeContent(dirty: string): string {
    return sanitizeHtml(dirty, {
        allowedTags: ALLOWED_TAGS,
        allowedAttributes: ALLOWED_ATTRIBUTES,
        allowedSchemes: ALLOWED_SCHEMES,
        // Force safe link attributes
        transformTags: {
            a: sanitizeHtml.simpleTransform("a", {
                target: "_blank",
                rel: "noopener noreferrer",
            }),
        },
    });
}
