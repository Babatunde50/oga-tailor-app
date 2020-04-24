import React, { useState, useEffect, useCallback } from 'react';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonSegment,
	IonSegmentButton,
	IonLabel,
	IonGrid,
	IonRow,
	IonCol,
	IonSearchbar,
	IonIcon,
	IonFab,
	IonFabButton,
	IonSpinner,
} from '@ionic/react';
import { cutOutline } from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import debounce from 'lodash.debounce';

import distanceFrom from '../utils/distance';
import TailorCard from '../components/TailorCard';

import { firestore } from '../firebase';

const { Geolocation } = Plugins;

const Tailors: React.FC = () => {
	const [tailorType, setTailorType] = useState<string>('nearYou');
	const [searchName, setSearchName] = useState<string>('');
	const [tailors, setTailors] = useState<any>([]);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [paginate, setPaginate] = useState(0);

	console.log(tailors);
	const tailorTypeHandler = (event: any) => {
		console.log(event.type);
		setTailorType(event.detail.value);
	};
	const searchTailorHandler = (event: any) => {
		console.log(event.type);
		setSearchName(event.detail.value);
	};
	const getCurrentPosition = async () => {
		const coordinates: any = await Geolocation.getCurrentPosition();
		console.log(coordinates);
		return { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
	};

	const fetchTailors = useCallback(async () => {
		setIsLoading(true);
		setError(false);
		try {
			const fetchedTailors: any = [];
			const querySnapshot: any = await firestore
				.collection('users')
				// .where('type', '==', 'tailor')
				.orderBy('displayName', 'asc')
				.startAfter(paginate * 3)
				.limit(3)
				.get();
			const currentPosition = await getCurrentPosition();
			if (querySnapshot.length <= 0) {
				setHasMore(false);
				return;
			}
			querySnapshot.forEach(function (doc: { data: () => any; id: any }) {
				const data: any = {
					...doc.data(),
					id: doc.id,
				};
				// data['distance'] = distanceFrom(
				// 	[data.coordinates.lat, data.coordinates.lng],
				// 	[currentPosition.lat, currentPosition.lng]
				// );
				fetchedTailors.push(data);
			});
			setIsLoading(false);
			setTailors((prev: any) => [...prev, ...fetchedTailors]);
			setPaginate((pag) => pag++);
		} catch (err) {
			console.log(err.message);
			setError(true);
			setIsLoading(false);
		}
	}, [setTailors, paginate, setIsLoading]);

	const handleScroll = debounce((e: any) => {
		console.log('Access');
		console.log(error, isLoading, hasMore);
		if (error || isLoading || !hasMore) return;

		// Checks that the page has scrolled to the bottom
		let element = e.target
		if (element.scrollHeight - element.scrollTop === element.clientHeight) {
		  // do something at end of scroll
		  fetchTailors();
			console.log('BOTTON');
		}
	}, 100);

	useEffect(() => {
		console.log(tailorType);
	}, [tailorType]);
	useEffect(() => {
		getCurrentPosition();
		fetchTailors();
	}, [fetchTailors]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Our Tailors</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent scroll-events={true} onIonScroll={() => console.log('scrolling')}>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton>
						<IonIcon icon={cutOutline} />
					</IonFabButton>
				</IonFab>
				<IonSegment onIonChange={tailorTypeHandler} value={tailorType}>
					<IonSegmentButton value="nearYou">
						<IonLabel>Near You</IonLabel>
					</IonSegmentButton>
					<IonSegmentButton value="popular">
						<IonLabel>Popular</IonLabel>
					</IonSegmentButton>
					<IonSegmentButton value="all">
						<IonLabel>All</IonLabel>
					</IonSegmentButton>
				</IonSegment>
				<IonGrid>
					<IonRow>
						<IonCol size-md="6" offset-md="3">
							<IonSearchbar animated={true} value={searchName} onIonChange={searchTailorHandler}></IonSearchbar>
						</IonCol>
					</IonRow>
					{isLoading && paginate === 0 && <IonSpinner color="primary" />}
					{tailors.map((tailor: any) => (
						<IonRow key={tailor.id}>
							<TailorCard {...tailor} />
						</IonRow>
					))}
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Tailors;
