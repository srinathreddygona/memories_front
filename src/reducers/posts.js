import { 
    CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, 
    FETCH_USER_POSTS, START_LOADING, END_LOADING, FETCH_POST, COMMENT 
} from "../constants/actiontypes";

export default (state = { isLoading: true, posts: [], hasMore: true, currentPage: 1, numberOfPages: 1 }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,  // Resets posts (for Home Page)
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };

            case FETCH_USER_POSTS:
                return {
                    ...state,
                    posts: action.payload.currentPage === 1 
                        ? action.payload.data // 🔹 Replace posts if it's the first page
                        : [...state.posts, ...action.payload.data], // 🔹 Append posts for pagination
                    hasMore: action.payload.currentPage < action.payload.numberOfPages,
                    currentPage: action.payload.currentPage,
                    numberOfPages: action.payload.numberOfPages,
                };


        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };

        case FETCH_POST:
            return { ...state, post: action.payload.post };

        case CREATE:
            return { ...state, posts: [action.payload, ...state.posts] };

        case UPDATE:
            return { 
                ...state, 
                posts: state.posts.map((post) => 
                    post._id === action.payload._id ? action.payload : post
                ),
            };

        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => 
                    post._id === action.payload._id ? action.payload : post
                ),
            };

        case DELETE:
            return { 
                ...state, 
                posts: state.posts.filter((post) => post._id !== action.payload) 
            };

        default:
            return state;
    }
};
