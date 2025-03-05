import { Grid, CircularProgress, Paper, TextField, Button } from "@material-ui/core";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { getUserPosts, getPostsBySearch } from "../../actions/posts";
import Post from "../Posts/Post/Post";
import Form from "../Form/Form";
import useStyles from "./styles";
import InfiniteScroll from "react-infinite-scroll-component";

const UserProfile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { posts, hasMore, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    
    const [page, setPage] = useState(1);
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

   
    const formRef = useRef(null);

    useEffect(() => {
        if (id) {
            dispatch(getUserPosts(id, 1)); // Load first page
            setPage(1);
        }
    }, [id, dispatch]);

    const fetchMorePosts = () => {
        if (hasMore) {
            dispatch(getUserPosts(id, page + 1));
            setPage((prevPage) => prevPage + 1);
        }
    };

    
    const handleEditPost = (id) => {
        setCurrentId(id);
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

  
    const searchPost = () => {
        if (search.trim() || tags.length) {
            dispatch(getPostsBySearch({ search, tags: tags.join(","), userId: id }));
            history.push(`/user/${id}/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
        } else {
            history.push(`/user/${id}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            searchPost();
        }
    };

    const handleAddTag = (tag) => setTags([...tags, tag]);
    const handleDeleteTag = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <div className={classes.profileContainer}>
            <h1 className={classes.heading}>My Posts</h1>

            <div className={classes.gridContainer}>
                {/* Left - Posts */}
                <div className={classes.postsWrapper}>
                    {isLoading && posts.length === 0 ? (
                        <CircularProgress />
                    ) : posts.length === 0 ? (
                        <p>No posts found.</p>
                    ) : (
                        <InfiniteScroll
                            dataLength={posts.length}
                            next={fetchMorePosts}
                            hasMore={hasMore}
                            loader={<center><CircularProgress /></center>}
                            scrollThreshold={0.9}
                            style={{ overflow: "hidden" }}
                        >
                            <div className={classes.postGrid}>
                                {posts.map((post) => (
                                    <Post key={post._id} post={post} setCurrentId={handleEditPost} />
                                ))}
                            </div>
                        </InfiniteScroll>
                    )}
                </div>

                
                <div className={classes.formWrapper}>
                    
                    <Paper elevation={6} className={classes.searchContainer}>
                        <TextField
                            name="search"
                            variant="outlined"
                            label="Search My Posts"
                            onKeyDown={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ChipInput
                            style={{ margin: "10px 0" }}
                            value={tags}
                            onAdd={handleAddTag}
                            onDelete={handleDeleteTag}
                            label="Search Tags (Press Enter to Add)"
                            variant="outlined"
                        />
                        <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">
                            Search
                        </Button>
                    </Paper>

                   
                    <Paper ref={formRef} elevation={6} className={classes.formContainer}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
