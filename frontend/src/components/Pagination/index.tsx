import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import './styles.css';
import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
  forcePage?: number;
};

const Pagination = ({ pageCount, range, onChange, forcePage }: Props) => {
  return (
    <>
      <ReactPaginate
        forcePage={forcePage}
        pageCount={pageCount}
        pageRangeDisplayed={range}
        marginPagesDisplayed={1}
        containerClassName="pagination-container"
        pageLinkClassName="pagination-icon"
        breakClassName="pagination-icon"
        previousClassName="arrow-previous"
        nextClassName="arrow-next"
        activeLinkClassName="pagination-link-active"
        disabledClassName="arrow-inactive"
        onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
        previousLabel={
          <div
            className="pagination-arrow-container"
            data-testid="arrow-previous"
          >
            <ArrowIcon />
          </div>
        }
        nextLabel={
          <div className="pagination-arrow-container" data-testid="arrow-next">
            <ArrowIcon />
          </div>
        }
      />
    </>
  );
};

export default Pagination;
