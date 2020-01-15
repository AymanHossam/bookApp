class Book {
    constructor(title, isbn, pageCount, publishedDate, thumbnailUrl, shortDescription, longDescription, status, authors, categories) {
        this.title = title;
        this.isbn = isbn
        this.pageCount = pageCount;
        this.publishedDate = publishedDate;
        this.thumbnailUrl = thumbnailUrl;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.status = status
        this.authors = authors;
        this.categories = categories;
    }
}

export default Book;

