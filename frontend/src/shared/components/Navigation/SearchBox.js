import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

// Responsible for rendering search box
const SearchBox = () => {

    // For navigating
    const history = useHistory();

    // Get keyword from URL
    const { keyword: urlKeyword  } = useParams();

    // state for keyword
    const [keyword, setKeyword] = useState(urlKeyword || "");

    // Handles search
    const searchHandler = (e) => {
        e.preventDefault();

        // If keyword is empty, redirect to home
        if(keyword.trim()) {
            setKeyword("");
            history.push(`/products/search/${keyword}`);
        } else {
            history.push('/');
        }
    }

  return (
    <Form className="d-flex ms-5" onSubmit={searchHandler}>
      <Form.Control
        type="search"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="me-2"
        aria-label="Search"
      />
      <Button type="submit" variant="outline-light">Search</Button>
    </Form>
  );
};

export default SearchBox;
