import PropTypes from "prop-types";
import {useEffect} from "react";
import {Pagination} from "react-bootstrap";

export default function CustomPagination({
                              itemsCount,
                              itemsPerPage,
                              currentPage,
                              setCurrentPage,
                              alwaysShown = false
                          }) {

    const pagesCount = Math.ceil(itemsCount / itemsPerPage);
    const isPaginationShown = alwaysShown ? true : pagesCount > 0;
    const isCurrentPageFirst = currentPage === 1;
    const isCurrentPageLast = currentPage === pagesCount;

    const changePage = number => {
        if (currentPage === number) return;
        setCurrentPage(number);
    };

    const onPageNumberClick = pageNumber => changePage(pageNumber);

    const onPreviousPageClick = () => {
        if (currentPage <= 1) return changePage(1);
        else changePage(currentPage => currentPage - 1);
    };

    const onNextPageClick = () => changePage(currentPage => currentPage + 1);

    const setLastPageAsCurrent = () => {
        if (currentPage > pagesCount) {
            pagesCount && setCurrentPage(pagesCount);
        }
    };

    useEffect(setLastPageAsCurrent, [pagesCount]);

    let isPageNumberOutOfRange;

    const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
        const pageNumber = index + 1;
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === pagesCount;
        const isCurrentPageWithinTwoPageNumbers =
            Math.abs(pageNumber - currentPage) <= 2;

        if (
            isPageNumberFirst ||
            isPageNumberLast ||
            isCurrentPageWithinTwoPageNumbers
        ) {
            isPageNumberOutOfRange = false;
            return (
                <Pagination.Item
                    activeLabel=""
                    key={pageNumber}
                    onClick={() => onPageNumberClick(pageNumber)}
                    active={pageNumber === currentPage}
                >
                    {pageNumber}
                </Pagination.Item>
            );
        }

        if (!isPageNumberOutOfRange) {
            isPageNumberOutOfRange = true;
            return <Pagination.Ellipsis key={pageNumber} className="muted"/>;
        }

        return null;
    });

    return (
        <>
            {isPaginationShown && (
                <Pagination>
                    <Pagination.Prev
                        className={isCurrentPageFirst ? "disable" : ""}
                        onClick={onPreviousPageClick}
                        disabled={isCurrentPageFirst}
                        style={{cursor: isCurrentPageFirst ? 'not-allowed' : 'pointer'}}
                    />
                    {pageNumbers}
                    <Pagination.Next
                        onClick={onNextPageClick}
                        disabled={isCurrentPageLast}
                        className={isCurrentPageLast ? "disable" : ""}
                        style={{cursor: isCurrentPageLast ? 'not-allowed' : 'pointer'}}
                    />
                </Pagination>
            )}
        </>
    );
};

CustomPagination.propTypes = {
    itemsCount: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    alwaysShown: PropTypes.bool
};
