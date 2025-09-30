type selectedFilters = {
    type: string,
    description: string
}


export function convertSelectedFiltersToQuery(filterList: selectedFilters[] | null) {
    if (!filterList) return null
    const result = `${filterList.map((item, index) => `${item.type}=${item.description}${index + 1 !== filterList.length ? "&" : ""}`)}`
    const removingCommas = result.split("").filter(item => item !== ",").join("")
    if (!removingCommas) return null
    return removingCommas
}