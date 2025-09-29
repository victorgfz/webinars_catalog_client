export function formatLanguage(lang: string): string {
    switch (lang) {
        case "pt-br":
            return "Portuguese";
        case "es":
            return "Spanish";
        case "eng":
            return "English";
        default:
            return lang;
    }
}
