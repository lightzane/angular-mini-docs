export interface CustomMetadata {
    /** (true or **false**) determines whether the title will be excluded in the titles list which is usually displayed on the left */
    exclude_title?: boolean;
    /** (true or **false**) determines whether to add indentation in each paragraph in the content */
    indent?: boolean;
    /** (true or **false**) determines whether to include the time (from `published_date`) to be displayed in the page  */
    include_time?: boolean;
}