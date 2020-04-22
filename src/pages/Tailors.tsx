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
	IonCard,
	IonCardTitle,
	IonCardSubtitle,
	IonCardHeader,
	IonIcon,
	IonCardContent,
	IonChip,
	IonFab,
	IonFabButton,
} from '@ionic/react';
import { star, call, mail, helpCircleOutline, cutOutline } from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import distanceFrom from '../utils/distance';

import { firestore } from '../firebase';

const { Geolocation } = Plugins;

const Tailors: React.FC = () => {
	const [tailorType, setTailorType] = useState<string>('nearYou');
	const [searchName, setSearchName] = useState<string>('');
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
		console.log(coordinates)
		return { lat: coordinates.coords.latitude, lng: coordinates.coords.longitude };
	};
	const fetchTailors = async () => {
		const querySnapshot = await firestore.collection('users').where('type', '==', 'tailor').get();
		const myPostion = await getCurrentPosition();
		querySnapshot.forEach(function (doc) {
			const data: any = {
				...doc.data(),
				id: doc.id,
			};
			console.log(distanceFrom([data.coordinates.lat, data.coordinates.lng], [ myPostion.lat, myPostion.lng ]));
		});
	};

	useEffect(() => {
		console.log(tailorType);
	}, [tailorType]);
	useEffect(() => {
		getCurrentPosition();
		fetchTailors();
	}, []);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Our Tailors</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
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
					<IonRow>
						<IonCol size-md="6" offset-md="3">
							<IonCard>
								<img
									alt="tailor"
									src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
								/>
								<IonCardHeader>
									<IonCardTitle>Kabir Enterprise</IonCardTitle>
									<IonCardSubtitle>
										<IonIcon color="warning" icon={star} />
										<IonIcon color="warning" icon={star} />
										<IonIcon color="warning" icon={star} />
										<IonIcon color="warning" icon={star} />
									</IonCardSubtitle>
								</IonCardHeader>
								<IonCardContent>
									<IonChip>
										<IonLabel> Call </IonLabel>
										<IonIcon color="primary" icon={call} />
									</IonChip>
									<IonChip>
										<IonLabel> Mail </IonLabel>
										<IonIcon color="danger" icon={mail} />
									</IonChip>
									<IonChip>
										<IonLabel>More Info</IonLabel>
										<IonIcon color="warning" icon={helpCircleOutline} />
									</IonChip>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Tailors;
