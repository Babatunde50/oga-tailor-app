import React, { useState, useEffect, useRef, useContext } from 'react';
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonLabel,
	IonGrid,
	IonRow,
	IonCol,
	IonIcon,
	IonItem,
	IonTextarea,
	IonButton,
	IonModal,
	IonButtons,
	IonText,
	IonSpinner,
	IonAlert,
} from '@ionic/react';
import { close, arrowForwardCircle } from 'ionicons/icons';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import firebase, { storage, geofirestore } from '../firebase';
import { UserContext } from '../providers/UserProvider';

import './NewPostModal.css';

const NewPostModal: React.FC<{ showModal: boolean; closeModal: () => void }> = ({ showModal, closeModal }) => {
	const filePickerRef = useRef<HTMLInputElement>(null);
	const cropperRef = useRef<Cropper>(null);
	const user: { uid: string; d: { coordinates: { latitude: number; longitude: number } } } | null = useContext(
		UserContext
	);
	const [preview, setPreview] = useState('');
	const [croppedImage, setCroppedImage] = useState('');
	const [story, setStory] = useState('');
	const [showStory, setShowStory] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const openFilePicker = () => {
		filePickerRef.current!.click();
	};
	const pickFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target!.files![0];
		if (!file.type.match(/^image\//)) {
			return;
		}
		const fr = new FileReader();
		fr.onload = () => {
			setPreview(fr.result!.toString());
		};
		fr.readAsDataURL(file);
	};
	const submitPostHandler = async (event: React.MouseEvent<HTMLIonButtonElement>) => {
		setIsLoading(true);
		setErrorMessage('');
		const postRef = storage.ref();
		const latitude = user!.d.coordinates.latitude;
		const longitude = user!.d.coordinates.longitude;
		const hashtags = story.split('#').slice(1);
		const imageName = new Date().getTime().toString();
		try {
			await postRef.child(`tailors-designs/${user!.uid}/${imageName}`).putString(croppedImage, 'data_url');
			const postURL = await postRef.child(`tailors-designs/${user!.uid}/${imageName}`).getDownloadURL();
			await geofirestore.collection('designs').add({
				imageURL: postURL,
				story: story,
				comments: [],
				likes: [],
				views: 0,
				userId: user!.uid,
				coordinates: new firebase.firestore.GeoPoint(latitude, longitude),
				hashtags: hashtags,
				createdAt: new Date(),
			});
			setIsLoading(false);
			closeModalHandler();
		} catch (err) {
			setIsLoading(false);
			setErrorMessage(err.message);
		}
	};
	const crop = () => {
		const croppedImage = cropperRef!.current!.getCroppedCanvas().toDataURL();
		setCroppedImage(croppedImage);
	};
	const closeModalHandler = () => {
		setPreview('');
		setCroppedImage('');
		setStory('');
		setShowStory(false);
		closeModal();
		setErrorMessage('');
	};
	return (
		<IonModal isOpen={showModal}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Add a New Design</IonTitle>
					<IonButtons slot="end">
						<IonButton color="light" onClick={closeModalHandler}>
							<IonIcon slot="icon-only" icon={close} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid>
					{!preview && !showStory && (
						<IonRow className="post-start-container">
							<IonCol>
								<h1>Share Your Work</h1>
								<p>Start by taking a photo of your latest design</p>
								<IonButton onClick={openFilePicker}> Select a Photo </IonButton>
								<input type="file" hidden ref={filePickerRef} onChange={pickFileHandler} />
							</IonCol>
						</IonRow>
					)}
					{!!preview && !showStory && (
						<IonRow>
							<IonCol>
								<Cropper
									ref={cropperRef}
									src={preview}
									style={{ height: '80vh', width: '100vw' }}
									guides={false}
									crop={crop}
									wheelZoomRatio={0.5}
								/>
								<IonButton
									expand="block"
									fill="outline"
									onClick={() => {
										setShowStory(true);
									}}
								>
									Next <IonIcon slot="end" icon={arrowForwardCircle} />{' '}
								</IonButton>
							</IonCol>
						</IonRow>
					)}
					{showStory && (
						<IonRow className="post-start-container">
							<IonCol>
								<IonItem>
									<IonLabel position="floating">Add a Story</IonLabel>
									<IonTextarea
										value={story}
										autofocus={true}
										cols={5}
										autoGrow={true}
										onIonChange={(e) => {
											setStory(e.detail.value!);
										}}
									></IonTextarea>
								</IonItem>
								<IonText color="primary">
									<p className="hashtag-text"> *Using hashtags(#) makes your design more easier to find. </p>
								</IonText>
								<IonButton expand="block" fill="outline" onClick={submitPostHandler}>
									{isLoading ? <IonSpinner name="crescent" /> : 'Add Post'}
								</IonButton>
							</IonCol>
						</IonRow>
					)}
				</IonGrid>
				<IonAlert
					isOpen={!!errorMessage}
					onDidDismiss={() => setErrorMessage('')}
					header={'An Erron Occured!'}
					message={errorMessage}
					buttons={['OK']}
				/>
			</IonContent>
		</IonModal>
	);
};

export default NewPostModal;
