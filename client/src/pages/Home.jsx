import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getBlogData = async () => {
      const res = await axios.get("http://localhost:4000/api/blog/all");
      setBlogs(res.data.blogs);
      setFilteredBlogs(res.data.blogs); 
    };
    getBlogData();
  }, []);

  return (
    <>
      
      <Header search={search} setSearch={setSearch} blogs={blogs} setFilteredBlogs={setFilteredBlogs} />
      <BlogList blogs={filteredBlogs} />
      <Newsletter />

    </>
  );
};

export default Home;
