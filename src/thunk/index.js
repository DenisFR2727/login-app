import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchedUsers = createAsyncThunk(
       "users/fetchUsers",
        async () => {
            const response = await fetch(
                "https://technical-task-api.icapgroupgmbh.com/api/table/"
            );
            return await response.json();
        }
);