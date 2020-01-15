import { ADD_FAVOURITE, DEL_FAVOURITE, SET_FAVOURITE } from '../actions/Books'
import Books from '../../data/Books'
import FavBook from '../../models/favBook'

const initialState = {
    books: Books,
    favBooks: []
}

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FAVOURITE:
            const fetchedData = action.data.map(book => {
                const foundBook = state.books.find(fbook => fbook.isbn === book.isbn)
                if (foundBook) {
                    return new FavBook(
                        book.key,
                        foundBook.title,
                        foundBook.isbn,
                        foundBook.pageCount,
                        foundBook.publishDate,
                        foundBook.thumbnailUrl,
                        foundBook.shortDescription,
                        foundBook.status,
                        foundBook.authors,
                        foundBook.categories
                    )
                }
                return
            })
            return {
                ...state,
                favBooks: fetchedData
            }
        case DEL_FAVOURITE:
            const favouriteBooks = state.favBooks.findIndex(book => book.isbn === action.book.isbn)

            if (favouriteBooks >= 0) {
                const updatedFav = [...state.favBooks]
                updatedFav.splice(favouriteBooks, 1)
                return {
                    ...state,
                    favBooks: updatedFav
                }
            }
        case ADD_FAVOURITE:
            const book = action.book
            const addedBook = new FavBook(
                action.bookID,
                book.title,
                book.isbn,
                book.pageCount,
                book.publishDate,
                book.thumbnailUrl,
                book.shortDescription,
                book.status,
                book.authors,
                book.categories
            )

            return {
                ...state,
                favBooks: state.favBooks.concat(addedBook)
            }

        default: return state
    }
}

export default booksReducer