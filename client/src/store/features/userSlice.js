import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      const { firstName, lastName, email } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
    },
    clearUserProfile: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.email = '';
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
