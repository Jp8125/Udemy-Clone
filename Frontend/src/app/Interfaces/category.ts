export interface Category {
    categoryId: number,
    categoryName: string,
    parentCategoryId: null|number,
    subCourses: Array<Category>
}
export interface CategoryDto{
    categoryName: string,
    parentCategoryId: number|null
}
export interface Categorysub {
    categoryId: number,
    categoryName: string,
    parentCategoryId: null|number,
}