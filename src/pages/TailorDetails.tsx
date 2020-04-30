import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonHeader, IonContent, IonToolbar, IonPage, IonTitle, IonBackButton, IonButtons, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

import { firestore } from '../firebase';

const TailorDetails: React.FC = () => {
	const { id } = useParams();
	const [tailor, setTailor] = useState<any>(null);
	const docRef = firestore.collection('users').doc(id);
	useEffect(() => {
		docRef
			.get()
			.then(function (doc) {
				if (doc.exists) {
					const data = doc.data();
					const neededData = {
						id: data!.uid,
						...data!.d,
					};
					setTailor(neededData);
				} else {
					// doc.data() will be undefined in this case
					console.log('No such document!');
				}
			})
			.catch(function (error) {
				console.log('Error getting document:', error);
			});
	}, []);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/tailors" />
					</IonButtons>
					<IonTitle>Testing</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonSegment onIonChange={(e) => console.log('Segment selected', e.detail.value)}>
					<IonSegmentButton value="designs">
						<IonLabel>Designs</IonLabel>
					</IonSegmentButton>
					<IonSegmentButton value="location">
						<IonLabel>Locations</IonLabel>
					</IonSegmentButton>
					<IonSegmentButton value="reviews">
						<IonLabel>Reviews</IonLabel>
					</IonSegmentButton>
				</IonSegment>
			</IonContent>
		</IonPage>
	);
};

export default TailorDetails;
