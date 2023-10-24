import { createSlice, createSelector } from "@reduxjs/toolkit"
import { fetchedUsers } from "../../thunk/index";

const initialState = {
    users: [],
    usersLoadingStatus: 'idle',
    isUserLoggedIn: false,
    displayedUsers: 4,
}

export const fetchUsers = fetchedUsers;

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
           setIsUserLoggedIn(state, action) {
              state.isUserLoggedIn = action.payload;
           },
           nextDisplayedUsers(state, action) {
              state.displayedUsers = action.payload;
           },
           prevDisplayedUsers(state, action) {
              state.displayedUsers = action.payload;
           },    
    },
    extraReducers:(builder) => {
        builder
           .addCase(fetchUsers.pending, state => {
             state.usersLoadingStatus = 'loading'})
           .addCase(fetchUsers.fulfilled, (state, action) => {
             state.usersLoadingStatus = 'idle';
             state.users = action.payload;
             })
           .addCase(fetchUsers.rejected, state => {
             state.usersLoadingStatus = 'error'
           })
           .addDefaultCase(() => {});
    }

});
export const usersList = createSelector(
    state => state.users,
    users => users
)
export const isUserLogged = createSelector(
    state => state.isUserLoggedIn,
    isUserLoggedIn =>  isUserLoggedIn
)

const { actions, reducer} = usersSlice;

export const {
    setIsUserLoggedIn,
    nextDisplayedUsers,
    prevDisplayedUsers
} = actions;

export default reducer;