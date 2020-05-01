import React, { useState, useEffect } from 'react';
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
	IonModal,
	IonButton,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import debounce from 'lodash.debounce';

// import distanceFrom from '../utils/distance';
import TailorCard from '../components/TailorCard';
import NewPostModal from '../components/NewPostModal';

import usePagination from '../hooks/firestore-pagination';

const Tailors: React.FC = () => {
	const [tailorType, setTailorType] = useState<string>('nearYou');
	const [searchName, setSearchName] = useState<string>('');
	const { loading, loadingError, loadingMore, loadingMoreError, hasMore, items, loadMore } = usePagination({
		limit: 3,
	});
	const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		console.log(loadingError?.message);
		if (loadingError?.message && !loading) {
			setError(true);
		}
	}, [loadingError, loading]);

	const tailorTypeHandler = (event: any) => {
		setTailorType(event.detail.value);
	};
	const searchTailorHandler = (event: any) => {
		setSearchName(event.detail.value);
	};

	const handleScroll = debounce(async (e: any) => {
		const scrollElement = await e.target.getScrollElement();

		if (error || loading || !hasMore) return;

		if (scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight) {
			loadMore();
		}
	}, 100);

	const tailors = items.map(function (doc) {
		const tailorData = doc.data();
		console.log(tailorData);
		return {
			id: doc.id,
			...tailorData,
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
					<IonFabButton
						onClick={() => {
							setShowModal(true);
						}}
					>
						<IonIcon icon={add} />
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
					message={loadingError?.message}
					buttons={['OK']}
				/>
				<NewPostModal
					showModal={showModal}
					closeModal={() => {
						setShowModal(false);
					}}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Tailors;
