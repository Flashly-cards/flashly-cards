import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Cards = {
  collectionId: string,
  frontText: string,
  backText:string
}

type CollectionItem = {
  userId: string,
  collectionName: string,
  _id: string,
  __v: number,
  cards: {
    [key: string]:Cards
  }
}

type InitialState = {
  collectionState: CollectionItem[]
};

const initialState: InitialState ={
  collectionState: [{
    userId:'1234',
    collectionName:'sample collection',
    _id:'sample id',
    __v: 5,
    cards: {
      'sampleCardId1': {
        collectionId: "sampleColId",
        frontText: "sample front",
        backText: "sample back"
      },
      'sampleCardId2': {
        collectionId: "sampleColId2",
        frontText: "sample front2",
        backText: "sample back2"
      },
    }
  },
  {
    userId:'1234',
    collectionName:'sample collection2',
    _id:'sample id',
    __v: 5,
    cards: {
      'sampleCardId1': {
        collectionId: "sampleColId",
        frontText: "sample front",
        backText: "sample back"
      },
      'sampleCardId2': {
        collectionId: "sampleColId2",
        frontText: "sample front2",
        backText: "sample back2"
      },
    }
  }],
}

export const collectionSlice = createSlice({
  name: "collectionState",
  initialState: initialState,
  reducers: {
    updateCollection: (state, action: PayloadAction<CollectionItem>) => {
      state.collectionState = [action.payload];
    },
  }
})

export const { updateCollection } = collectionSlice.actions;

export default collectionSlice.reducer;