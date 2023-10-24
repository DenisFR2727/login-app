import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersList, 
         fetchUsers, 
         isUserLogged, 
         prevDisplayedUsers, 
         nextDisplayedUsers } from "../reducer/usersSlice";
import Table from "./Table.jsx";
import Pagination from "../pagination/Pagination";

const UsersList = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersList); 
    const isLogged = useSelector(isUserLogged);
    const displayed = useSelector((state) => state.displayedUsers);

// Якщо логін співпадає, то йде запис в масив orders в  usersSlice;
useEffect(() => {
    if(isLogged){
        dispatch(fetchUsers());
    }
},[isLogged,dispatch])

// render Table
const render_users = (arr, displayed) => {
    if (!Array.isArray(arr) || arr.length === 0) {
        return []; 
    }

    const list = arr.map((user) => {
           return <Table key={user.id} {...user}/>
      }).slice(0, displayed);

    return list;
}

const table_list = render_users(users.results, displayed);

// pagination
const next = useCallback(() => {
      dispatch(nextDisplayedUsers(displayed + 4));
},[dispatch, displayed]);

const prev = useCallback(() => {
    if(displayed <= 4){
        return false;
    }
      dispatch(prevDisplayedUsers(displayed - 4));
},[dispatch, displayed]);

    return (
           <div>
              {isLogged && (
                      <Pagination nextUsersClick={next}
                                  prevUsersClick={prev} />
              )} 
               {table_list}
            {isLogged && (
                 <img style={{ display: 'block', margin: '0 auto' }} 
                      src="https://b1694534.smushcdn.com/1694534/wp-content/uploads/2021/06/12-1.png?lossy=1&strip=1&webp=1" 
                      alt=""
                 />
            )}
           </div>
    )
}
export default UsersList;