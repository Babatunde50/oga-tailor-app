import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	IonHeader,
	IonContent,
	IonToolbar,
	IonPage,
	IonTitle,
	IonBackButton,
	IonButtons,
	IonSegment,
	IonSegmentButton,
	IonLabel,
	IonRow,
	IonAvatar,
	IonCol,
	IonGrid,
	IonButton,
} from '@ionic/react';

import { firestore } from '../firebase';
import './TailorDetails.css';

const TailorDetails: React.FC = () => {
	const { id } = useParams();
	const [tailor, setTailor] = useState<any>(null);
	const [view, setView] = useState('designs');
	const docRef = firestore.collection('users').doc(id);
	console.log(tailor);
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
				<IonGrid>
					<IonRow>
						<IonCol size="3">
							<IonAvatar>
								<img className="tailor-avatar" src={tailor?.companyLogoURL} alt={tailor?.displayName} />
							</IonAvatar>
						</IonCol>
						<IonCol size="9">
							<IonRow className="stats">
								<IonCol>
									<span className="stats-number"> 115 </span>
									<span className="stats-text">Followers</span>
								</IonCol>
								<IonCol>
									<span className="stats-number"> 0 </span>
									<span className="stats-text">Following</span>
								</IonCol>
							</IonRow>
							<IonButton expand="block" size="small">
								Follow
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<h2 className="company-name"> {tailor?.companyName} </h2>
							<p className="display-name"> {tailor?.displayName} </p>
							<span className="contact"> { tailor?.email} </span>
							<span className="contact">{tailor?.telephone}</span>
						</IonCol>
					</IonRow>
				</IonGrid>
				<IonSegment onIonChange={(e: any) => setView(e.detail!.value)} value={view}>
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
