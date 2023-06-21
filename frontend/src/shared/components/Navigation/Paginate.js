import React from "react";
import { Link } from "react-router-dom";

// Responsible for rendering pagination buttons.
const Paginate = (props) => {

  return (
    <React.Fragment>
      {props.pages > 1 && (
        <ul className="pagination justify-content-center">
          {[...Array(props.pages).keys()].map((page) => (
            <li
              key={page + 1}
              className={`${page + 1 === props.page ? "page-item active" : "page-item"}`}
            >
              <Link
                to={
                  !props.isAdmin
                    ? props.keyword
                      ? `/products/search/${props.keyword}/page/${page + 1}`
                      : `/products/page/${page + 1}`
                    : `/admin/products/page/${page + 1}`
                }
                className="page-link"
              >{page + 1}</Link>
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};

export default Paginate;
