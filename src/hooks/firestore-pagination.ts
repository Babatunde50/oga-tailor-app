import { useReducer, useEffect } from 'react';
import { GeoQuerySnapshot } from 'geofirestore';
import firebase from 'firebase';

import { geofirestore } from '../firebase';
import getCurrentPosition from '../utils/getCurrentPosition';

type StateType = {
	hasMore: boolean;
	items: any[];
	after: GeoQuerySnapshot | null;
	lastLoaded: any | null;
	loadingMore: boolean;
	limit: number;
	loadingMoreError: null | Error;
	loading: boolean;
	loadingError: null | Error;
};

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;

export type ActionType =
	| Action<'LOAD-MORE'>
	| Action<
			'LOADED',
			{
				value: GeoQuerySnapshot;
				limit: number;
			}
	  >
	| Action<'ERROR', { value: Error }>;

const initialState = {
	hasMore: false,
	after: null,
	limit: 0,
	items: [],
	lastLoaded: null,
	loading: true,
	loadingError: null,
	loadingMore: false,
	loadingMoreError: null,
};

function reducer(state: StateType, action: ActionType): StateType {
	switch (action.type) {
		case 'LOADED': {
			let items = [...state.items];
			let isAdding = false;

			action.value.docChanges().forEach((change) => {
				if (change.type === 'added') {
					isAdding = true;
					addItem(change.doc, items);
				} else if (change.type === 'modified') {
					updateItem(change.doc, items);
				} else if (change.type === 'removed') {
					deleteItem(change.doc, items);
				}
			});

			const nextLimit = items.length + action.limit;

			let end = items.length < action.limit || nextLimit === state.limit;

			return {
				...state,
				hasMore: isAdding ? !end : state.hasMore,
				limit: nextLimit,
				loading: false,
				loadingError: null,
				lastLoaded: action.value.docs[action.value.docs.length - 1],
				loadingMore: false,
				items,
			};
		}

		case 'LOAD-MORE': {
			return {
				...state,
				loadingMore: true,
				after: state.lastLoaded,
			};
		}

		case 'ERROR': {
			return {
				...state,
				loadingError: action.value,
				loading: false,
			};
		}
	}
}

function findIndexOfDocument(doc: any, items: any[]) {
	return items.findIndex((item) => {
		return item.id === doc.id;
	});
}

function updateItem(doc: any, items: any[]) {
	const i = findIndexOfDocument(doc, items);
	items[i] = doc;
}

function deleteItem(doc: any, items: any[]) {
	const i = findIndexOfDocument(doc, items);
	items.splice(i, 1);
}

function addItem(doc: any, items: any[]) {
	const i = findIndexOfDocument(doc, items);
	if (i === -1) {
		items.push(doc);
	}
}

interface PaginationOptions {
	// how many documents should we fetch at a time?
	limit?: number;
}

export default function usePaginateQuery({ limit = 25 }: PaginationOptions = {}) {
	const [state, dispatch] = useReducer(reducer, initialState);

	// when "after" changes, we update our query
	useEffect(() => {
		let unsubscribe: any
		const callQuery = async () => {
			const coordinates = await getCurrentPosition();
			
			const query = geofirestore
				.collection('users')
				.near({ center: new firebase.firestore.GeoPoint(coordinates!.lat, coordinates!.lng), radius: 1000 })
				.where('type', '==', 'tailor');
			let fn = query.limit(state.limit || limit);
			
			unsubscribe = fn.onSnapshot(
				(snap: GeoQuerySnapshot) => {
					console.log(snap);
					dispatch({ type: 'LOADED', value: snap, limit });
				},
				function (error) {
					dispatch({ type: 'ERROR', value: error });
				}
			);
		};
		callQuery();
		return () => unsubscribe();
	}, [state.after]);

	// trigger firebase to load more
	function loadMore() {
		dispatch({ type: 'LOAD-MORE' });
	}

	return {
		loadingMore: state.loadingMore,
		loadingError: state.loadingError,
		loadingMoreError: state.loadingMoreError,
		loading: state.loading,
		hasMore: state.hasMore,
		items: state.items,
		loadMore,
	};
}
