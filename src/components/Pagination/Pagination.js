import React from "react"
import classnames from "classnames"
import { usePagination, DOTS } from "./usePagination"
import PropTypes from "prop-types"
import "./Pagination.scss"

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, j) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key={j}>
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={j}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  )
}

Pagination.propTypes = {
  onPageChange: PropTypes.any,
  totalCount: PropTypes.any,
  siblingCount: PropTypes.any,
  pageSize: PropTypes.any,
  className: PropTypes.any,
  currentPage: PropTypes.any,
}

export default Pagination
