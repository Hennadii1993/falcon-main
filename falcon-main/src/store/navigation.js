import React from 'react';
import {create} from 'zustand';

const useNavigationStore = create((set, get) => ({
  rootNavigatorRef: React.createRef(),
  dashboardNavigatiorRef: React.createRef()
}));

export default useNavigationStore;
