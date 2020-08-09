import axios from 'axios';
import { parseCookeis } from '../util/cookie-parse';


export const servises = {
    // postPosts: (data, redirect) => {
    //     const body = {
    //         description: data,
    //     }
    //     return fetch(`//localhost:9999/api/origami`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify(body),
    //             credentials: 'include'
    //         }).then(res => res.json())
    //         .then(redirect());
    // },
    postComment: (body, rendering) => {
        console.log(body)
        fetch(`//localhost:9999/api/comment`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => rendering());
    },
    getComments: (dispatch, bookId) => {
        // return axios.get('//localhost:9999/api/comment')
        //     .then(res => {
        //         let newList = [];
        //         res.data.forEach(comment => {
        //             if (bookId !== undefined) {

        //                 if (bookId === comment.book) {
        //                     newList.push(comment);
        //                 }
        //             }
        //         });
        //         // setComment(newList);
        //         // return setComment;
        //         dispatch({ type: 'getComments', payload: newList });
        //     })
        //     .catch((myError) => console.log(myError));
        axios.get(`//localhost:9999/api/comment/book/${bookId}`)
            .then(res => {
                dispatch({ type: 'getComments', payload: res.data });
            })
            .catch((myError) => console.log(myError));
    },
    getUserComment: (setComments, userId) => {
        // axios.get('//localhost:9999/api/comment')
        //     .then(res => {
        //         let newList = [];
        //         res.data.forEach(comment => {
        //             if (userId !== undefined) {

        //                 if (userId === comment.author) {
        //                     newList.push(comment);
        //                 }
        //             }
        //         });
        //         setComment(newList);
        //         return setComment;
        //     })
        //     .catch((myError) => console.log('failed to load'));

        axios.get(`//localhost:9999/api/comment/user/${userId}`)
            .then(res => {
                setComments(res.data);
                return setComments;
            })
            .catch((myError) => console.log(myError));
    },
    putBookRating: (body, bookId) => {
        fetch(`//localhost:9999/api/book/editBookRaiting/${bookId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            }).then(res => res.json())
            .catch(err => console.log(err));
    },
    putFavoriteBook: (body, userId) => {
        fetch(`//localhost:9999/api/user/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            }).then(res => res.json())
            .catch(err => console.log(err));
    },
    getFavoriteBooks: (favoriteBooks, setBooks) => {
        axios.get('//localhost:9999/api/book')
            .then(res => {
                let newFavBooks = [];
                res.data.forEach(book => {
                    favoriteBooks.forEach(favBook => {
                        if (book._id === favBook) {
                            newFavBooks.push(book);
                        }
                    })
                })
                setBooks(newFavBooks);
            })
            .catch((myError) => console.log('failed to load'));
    },
    getBook: (setBook) => {
        axios.get('//localhost:9999/api/book')
            .then(res => {
                setBook(res.data)
                return setBook;
            })
            .catch((myError) => console.log('failed to load'));
    },
    getSpecificBookDispatch: (dispatch, id) => {
        axios.get(`//localhost:9999/api/book/${id}`)
            .then(res => {
                dispatch({ type: 'getBook', payload: res.data });
            })
            .catch((myError) => console.log('failed to load'));
    },
    getSpecificBook: (setBook, id) => {
        axios.get(`//localhost:9999/api/book/${id}`)
            .then(res => {
                setBook(res.data);
                return setBook;
            })
            .catch((myError) => console.log('failed to load'));
    },
    getBooksByAuthor: (setBooks, author) => {
        axios.get(`//localhost:9999/api/book/author/${author}`)
            .then(res => {
                console.log(res.data)
                setBooks(res.data);
                return setBooks;
            })
            .catch((myError) => console.log('failed to load'));
    },
    getBooksByPublisher: (setBooks, publisher) => {
        axios.get(`//localhost:9999/api/book/publisher/${publisher}`)
            .then(res => {
                setBooks(res.data);
                return setBooks;
            })
            .catch((myError) => console.log('failed to load'));
    },
    getBooksByGenre: (setBooks, genre) => {
        axios.get(`//localhost:9999/api/book/genre/${genre}`)
            .then(res => {
                setBooks(res.data);
                return setBooks;
            })
            .catch((myError) => console.log('failed to load'));
    },
    getSearch: (setBook, searchValue, genres) => {
        axios.get('//localhost:9999/api/book')
            .then(res => {
                let genreList = [];
                let newList = [];
                let check = false;

                res.data.forEach(book => {
                    if (genres.length > 0) {
                        for (let i = 0; i < genres.length; i++) {
                            console.log(genres[i])
                            console.log(book.genres)
                            if (book.genres.includes(genres[i])) {
                                check = true;
                            } else {
                                check = false;
                                break;
                            }
                        }
                        if (check) {
                            genreList.push(book);
                        }
                        // all included genres
                        // if (book.genres.some(g => genres.includes(g))) {
                        //     genreList.push(book);
                        // }
                    } else {
                        if (searchValue !== undefined) {
                            if (book.title.toLowerCase().match(searchValue.toLowerCase())) {
                                newList.push(book);
                            }
                        }
                    }

                });

                if (genreList.length > 0) {
                    if (searchValue !== "") {
                        genreList.forEach(book => {
                            if (book.title.toLowerCase().match(searchValue.toLowerCase())) {
                                newList.push(book);
                            }
                        })
                    } else {
                        newList = genreList;
                    }
                }
                setBook(newList);
                return setBook;
            })
            .catch((myError) => console.log('failed to load'));
    },
    getSuggestedBooks: (setBooks) => {
        axios.get(`//localhost:9999/api/suggestedBook/`)
            .then(res => {
                setBooks(res.data);
                return setBooks;
            })
            .catch((myError) => console.log('failed to load'));
    },
    postSuggestedBook: (body, rendering, redirect) => {
        fetch(`//localhost:9999/api/suggestedBook`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                rendering();
                redirect();
            })
            .catch(err => console.log(err));
    },
    deleteSuggestedBook: (id, rendering) => {
        console.log(id)
        axios.delete(`//localhost:9999/api/suggestedBook/${id}`,
            {
                withCredentials: true,
                credentials: 'include'
            })
            .then(res => {
                console.log(res)
                rendering()
            })
            .catch(err => console.log(err));
    },
    postBook: (body, rendering, redirect) => {
        return fetch(`//localhost:9999/api/book`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                rendering();
                redirect();
            })
            .catch(err => console.log(err));
    },
    editBook: (body, bookId, redirect) => {
        fetch(`//localhost:9999/api/book/editBook/${bookId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            }).then(res => res.json())
            .then(redirect())
            .catch(err => console.log(err));
    }
    ,
    deleteBook: (id, redirect) => {
        const params = {
            id: id
        }
        return axios.delete(`//localhost:9999/api/book/${id}`, params,
            {
                withCredentials: true,
                credentials: 'include'
            }
        )
            .then(res => {
                console.log(id)
                console.log(res);
                redirect();
            })
            .catch(err => console.log(err));
        // return fetch(`//localhost:9999/api/book/${id}`,
        //     {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-type': 'application/json'
        //         },
        //         body: JSON.stringify(id),
        //         credentials: 'include'
        //     })
        //     .then(res => {
        //         res.json();
        //     })
        //     .then(redirect())
        //     .catch(err => console.log(err))
    }
    ,
    register: (body, rendering, redirect) => {
        return axios.post('//localhost:9999/api/user/register', body)
            .then(res => {
                rendering();
                redirect();
            })
            .catch(err => console.log(err));
    },
    login: (body, context, redirect) => {
        return axios.post('//localhost:9999/api/user/login', body,
            {
                withCredentials: true,
                credentials: 'include'
            })
            .then(res => {
                const cookies = parseCookeis();
                context.setingLogged(!!cookies['x-auth-token']);
                context.setingUser(res.data);
                redirect();
            })
            .catch(err => alert('wrong username or password'));
    },
    logout: (setingLogged, setingUser, redirect) => {
        return axios.post('//localhost:9999/api/user/logout', '',
            {
                withCredentials: true,
                credentials: 'include'
            })
            .then(res => {
                const cookies = parseCookeis();
                setingLogged(!!cookies['x-auth-token']);
                redirect();
            })
            .catch(err => console.log(err));
    },
    getUser: (setUser) => {
        fetch("//localhost:9999/api/auth", { credentials: 'include' })
            .then(res => res.status === 200
                ? res.json()
                : res.text().then(text => Promise.reject(text))
            )
            .then(user => {
                return setUser(user)
            })
            .catch((err) => console.log(err));
    },
    getUserDispatch: (dispatch) => {
        fetch("//localhost:9999/api/auth", { credentials: 'include' })
            .then(res => res.status === 200
                ? res.json()
                : res.text().then(text => Promise.reject(text))
            )
            .then(user => {
                dispatch({ type: 'getUser', payload: user });
            })
            .catch((err) => console.log(err));
    },
    getSpecificUser: (userId, setUser) => {
        axios.get(`//localhost:9999/api/user/${userId}`)
            .then(res => setUser(res.data))
            .catch((err) => console.log(err));
    },
    getAllUsers: (setUser) => {
        fetch("//localhost:9999/api/user", { credentials: 'include' })
            .then(res => res.status === 200
                ? res.json()
                : res.text().then(text => Promise.reject(text))
            )
            .then(user => {
                return setUser(user)
            })
            .catch((err) => console.log(err));
    }
}