export const ADD_FAVOURITE = 'add_favourite'
export const DEL_FAVOURITE = 'del_favourite'
export const SET_FAVOURITE = 'set_favourite'





export const fetchFavourite = () => {
    return async (dispatch, getState) => {
        const userId = getState().Auth.userId
        const response = await fetch(`https://bookapp-d2f84.firebaseio.com/favourites/${userId}.json`)
        const resData = await response.json()

        const fetchedDate = []
        for (let key in resData) {
            fetchedDate.push(
                {
                    key,
                    isbn: resData[key].isbn,
                }
            )
        }

        dispatch({ type: SET_FAVOURITE, data: fetchedDate })
    }
}

export const addFavourite = (book) => {
    return async (dispatch, getState) => {
        const userId = getState().Auth.userId
        const token = getState().Auth.token

        const response = await fetch(`https://bookapp-d2f84.firebaseio.com/favourites/${userId}.json?auth=${token}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    isbn: book.isbn
                })
            })
        const resData = await response.json()
        const bookID = resData.name
        console.log(bookID)

        dispatch({ type: ADD_FAVOURITE, book, bookID })
    }
}

export const delFavourite = (book) => {
    return async (dispatch, getState) => {
        const userId = getState().Auth.userId
        const token = getState().Auth.token

        const response = await fetch(`https://bookapp-d2f84.firebaseio.com/favourites/${userId}/${book.id}.json?auth=${token}`,
            {
                method: 'DELETE'
            })
        const resData = await response.json()

        dispatch({ type: DEL_FAVOURITE, book })
    }
}


