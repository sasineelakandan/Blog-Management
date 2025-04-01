import axios from "axios";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`);
      const data = Array.isArray(res.data) ? res.data : [];
      setPosts(data);
      setNoResults(data.length === 0);
    } catch (err) {
      console.log(err);
      setNoResults(true);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  useEffect(() => {
    if (Array.isArray(posts)) {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      setDisplayedPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    } else {
      setDisplayedPosts([]);
    }
  }, [posts, currentPage]);

  const clearSearch = () => {
    navigate("/");
  };

  return (
    <>
      <div className="bg-gray-50 min-h-[80vh] py-10">
        <div className="text-center my-12 px-4">
          <h1 className="text-5xl font-extrabold text-indigo-800 mb-4">
            Explore Our Latest Blogs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the latest trends, insights, and tips from our vibrant community of writers and thinkers.
          </p>
          {search && (
            <button
              onClick={clearSearch}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Clear Search
            </button>
          )}
        </div>
        <div className="px-8 md:px-[200px]">
          {loader ? (
            <div className="h-[40vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : noResults ? (
            <h3 className="text-center font-bold mt-16 text-gray-600">
              No posts available
            </h3>
          ) : (
            <>
              <div className="grid gap-8">
                {Array.isArray(displayedPosts) &&
                  displayedPosts.map((post) => (
                    <Link
                      to={user ? `/posts/post/${post?._id}` : "/login"}
                      key={post?._id}
                      className="block transition-transform transform hover:scale-105"
                    >
                      <HomePosts post={post} />
                    </Link>
                  ))}
              </div>

              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md text-white transition-all ${
                    currentPage === 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  Prev
                </button>
                <span className="px-4 py-2 text-lg font-semibold text-gray-800">
                  Page {currentPage} of {Math.max(1, Math.ceil(posts.length / postsPerPage))}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(currentPage + 1, Math.ceil(posts.length / postsPerPage))
                    )
                  }
                  disabled={currentPage === Math.ceil(posts.length / postsPerPage) || posts.length === 0}
                  className={`px-4 py-2 rounded-md text-white transition-all ${
                    currentPage === Math.ceil(posts.length / postsPerPage) || posts.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
