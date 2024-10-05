'use client';
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';


const PromptCardList = ({data, handleTagClick}) => {
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
      <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
      />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);


  // Search States
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  const fetchPosts = async () => {
    const response = await fetch(`/api/prompt`);
    const data = await response.json();

    setAllPosts(data);
  } 

  useEffect(()=>{ 
    fetchPosts();
  }, []);
  
  const filterPrompts = (searchText) =>{
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // Debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPrompts(e.target.value);
        setSearchedResults(searchResults);
      }, 500)
    );
  }

  // Populate  search input with tag value when it's clicked.
  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResults = filterPrompts(tag);
    setSearchedResults(searchResults);
  }

  


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Rechercher des prompts'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {
        <PromptCardList
          data={searchText ? searchedResults : allPosts}
          handleTagClick={handleTagClick}
        />
        }
    </section>
  )
}

export default Feed