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
	IonAlert,
} from '@ionic/react';
import { cutOutline } from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import debounce from 'lodash.debounce';

import distanceFrom from '../utils/distance';
import TailorCard from '../components/TailorCard';
import usePagination from 'firestore-pagination-hook';

import { firestore } from '../firebase';

const { Geolocation } = Plugins;

const Tailors: React.FC = () => {
	const [tailorType, setTailorType] = useState<string>('nearYou');
	const [searchName, setSearchName] = useState<string>('');
	const { loading, loadingError, loadingMore, loadingMoreError, hasMore, items, loadMore } = usePagination(
		firestore.collection('users').where('type', '==', 'tailor'),
		{
			limit: 3,
		}
	);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (items.length === 0 && !loading) {
			setError(true);
		}
	}, [loadingError, items]);

	const tailorTypeHandler = (event: any) => {
		setTailorType(event.detail.value);
	};
	const searchTailorHandler = (event: any) => {
		setSearchName(event.detail.value);
	};
	const getCurrentPosition = async () => {
		const coordinates: any = await Geolocation.getCurrentPosition();
		return { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
	};

	const handleScroll = debounce(async (e: any) => {
		const scrollElement = await e.target.getScrollElement();

		if (error || loading || !hasMore) return;

		if (scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight) {
			loadMore();
		}
	}, 100);

	const tailors = items.map(function (doc) {
		// do some stuffs;
		return {
			id: doc.id,
			...doc.data(),
		};
	});

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Our Tailors</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent scrollEvents={true} onIonScroll={handleScroll} style={{ overflow: 'scroll' }}>
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
					{loading && (
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<IonSpinner color="primary" name="crescent" />
						</div>
					)}
					{tailors.map((tailor: any) => (
						<IonRow key={tailor.id}>
							<TailorCard {...tailor} />
						</IonRow>
					))}
					{loadingMore && (
						<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<IonSpinner color="primary" name="crescent" />
						</div>
					)}
				</IonGrid>
				<IonAlert
					isOpen={error}
					onDidDismiss={() => setError(false)}
					header={'Error'}
					message={'Failed to get document because the client is offline'}
					buttons={['OK']}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Tailors;
