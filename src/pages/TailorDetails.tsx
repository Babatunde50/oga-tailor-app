import React, { useEffect, useState, useContext } from 'react';
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

import './TailorDetails.css';
import { firestore } from '../firebase';

import Designs from '../components/Designs';
import Location from '../components/Location';
import Reviews from '../components/Reviews';
import { UserContext } from '../providers/UserProvider';

const TailorDetails: React.FC = () => {
	const { id } = useParams();
	const user: any = useContext(UserContext);
	const [tailor, setTailor] = useState<any>(null);
	const [isFollowing, setIsFollowing] = useState({ status: false, id: ''});
	const [ followersData, setIsFollowersData ] = useState({ followers: '', following: '' });
	const [view, setView] = useState('designs');
	const userRef = firestore.collection('users').doc(id);
	const followRef = firestore.collection('followers')


	const followHandler = async () => {
		if(isFollowing.status) {
			followRef.doc(isFollowing.id).delete()
			setIsFollowing({id: '', status: false})
			setIsFollowersData(prev => ({ ...prev, followers: (+prev.followers - 1).toString() }))
		} else {
			const { id: FSID } = await followRef.add({
				followerId: user.uid,
				followingId: id
			})
			setIsFollowing({ id: FSID, status: true})
			setIsFollowersData(prev => ({ ...prev, followers: (+prev.followers + 1).toString() }))
		}
	};

	const unFollowHandler = () => {};

	const viewProfileHandler = () => {};

	const getIsFollowing = () => {
		followRef
			.where("followerId", "==", user.uid)
			.where("followingId", "==", id)
			.get()
			.then(querySnapshot => { 
				querySnapshot.forEach(function (doc) {
					// console.log(doc.id, ' => ', doc.data());
					setIsFollowing({ status: true, id: doc.id})
				});
			 } )
	}

	const getNeededData = () => {
		userRef
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
	}

	const getFollowersNum = async () => {
		const { size: followings } = await followRef.where("followerId", "==", id).get()
		const { size: followers } = await followRef.where("followingId", "==", id).get()
		setIsFollowersData({ followers: followers.toString(), following: followings.toString() })
	}

	useEffect(() => {
		getNeededData();
		getFollowersNum();
		if(user?.uid) {
			getIsFollowing();
		}
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
									<span className="stats-number"> { followersData.followers } </span>
									<span className="stats-text">Followers</span>
								</IonCol>
								<IonCol>
									<span className="stats-number"> { followersData.following } </span>
									<span className="stats-text">Following</span>
								</IonCol>
							</IonRow>
							<IonButton
								expand="block"
								size="small"
								onClick={() => {
									user?.uid === id ? viewProfileHandler() : user ? followHandler() : unFollowHandler();
								}}
							>
								{user?.uid === id ? 'View Your Profile' : user && !isFollowing.status ? 'Follow' : user && isFollowing.status ? 'Unfollow' : 'View Profile'}
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<h2 className="company-name"> {tailor?.companyName} </h2>
							<p className="display-name"> {tailor?.displayName} </p>
							<span className="contact"> {tailor?.email} </span>
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
				{view === 'designs' ? (
					<Designs userId={id!} />
				) : view === 'location' ? (
					<Location coords={tailor.coordinates} />
				) : (
					<Reviews />
				)}
			</IonContent>
		</IonPage>
	);
};

export default TailorDetails;
