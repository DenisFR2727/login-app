import "./pagination.scss";

const Pagination = ({nextUsersClick, prevUsersClick}) => {

const nextUsers = () => {
    nextUsersClick();
}
const prevUsers = () => {
    prevUsersClick();
};

    return (
        <div className="pagination_btn_users">
              <button onClick={nextUsers}>Next 3</button>
              <button onClick={prevUsers}>Prev 3</button>
        </div>
    )
};
export default Pagination;